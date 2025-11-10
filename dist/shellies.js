"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shellies = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const devices_1 = require("./devices");
const rpc_1 = require("./rpc");
/**
 * Default options for discovered devices.
 */
const DEFAULT_DEVICE_OPTIONS = {
    exclude: false,
    protocol: 'websocket',
};
/**
 * Default `Shellies` options.
 */
const DEFAULT_SHELLIES_OPTIONS = {
    autoLoadStatus: true,
    autoLoadConfig: false,
    deviceOptions: null,
};
/**
 * This is the main class for the shellies-ds9 library.
 * This class manages a list of Shelly devices. New devices can be added by registering a device discoverer.
 */
class Shellies extends eventemitter3_1.default {
    /**
     * @param opts - A set of configuration options.
     */
    constructor(opts) {
        super();
        /**
         * Factory used to create new `WebSocketRpcHandler`s.
         */
        this.websocket = new rpc_1.WebSocketRpcHandlerFactory();
        /**
         * Holds all devices, mapped to their IDs for quick and easy access.
         */
        this.devices = new Map();
        /**
         * Event handlers bound to `this`.
         */
        this.discoverHandler = this.handleDiscoveredDevice.bind(this);
        /**
         * Holds IDs of devices that have been discovered but not yet added.
         */
        this.pendingDevices = new Set();
        /**
         * Holds IDs of devices that have been discovered but are excluded or whose
         * model designation isn't recognized.
         */
        this.ignoredDevices = new Set();
        // store the options, with default values
        this.options = { ...DEFAULT_SHELLIES_OPTIONS, ...(opts || {}) };
    }
    /**
     * The number of devices.
     */
    get size() {
        return this.devices.size;
    }
    /**
     * Adds a device. If a device with the same ID has already been added, an
     * error will be thrown.
     * @param device - The device to add.
     */
    add(device) {
        // make sure we don't have a device with the same ID
        if (this.devices.has(device.id)) {
            throw new Error(`Device with ID ${device.id} already added`);
        }
        // make sure its not marked as pending
        this.pendingDevices.delete(device.id);
        // add the device
        this.devices.set(device.id, device);
        // emit an `add` event
        this.emit('add', device);
        return this;
    }
    /**
     * Determines whether a device has been added.
     * @param deviceOrId - The device or device ID to test.
     * @returns `true` if the device has been added; `false` otherwise.
     */
    has(deviceOrId) {
        const id = deviceOrId instanceof devices_1.Device ? deviceOrId.id : deviceOrId;
        return this.devices.has(id);
    }
    /**
     * Returns the device with the given ID, or `undefined` if no such device was
     * found.
     */
    get(deviceId) {
        return this.devices.get(deviceId);
    }
    /**
     * Executes a provided function once for each device.
     * @param callback - Function to execute for each device.
     * @param thisArg - Value to be used as `this` when executing `callback`.
     */
    forEach(callback, thisArg) {
        this.devices.forEach((device, id) => {
            callback.call(thisArg, device, id, this);
        });
    }
    /**
     * Returns a new Iterator object that contains an array of
     * `[DeviceId, Device]` for each device.
     */
    entries() {
        return this.devices.entries();
    }
    /**
     * Returns a new Iterator object that contains the device IDs for each device.
     */
    keys() {
        return this.devices.keys();
    }
    /**
     * Returns a new Iterator object that contains each device.
     */
    values() {
        return this.devices.values();
    }
    /**
     * Returns a new Iterator object that contains each device.
     */
    [Symbol.iterator]() {
        return this.devices.values();
    }
    /**
     * Removes a device.
     * @param deviceOrId - The device or ID of the device to remove.
     * @returns `true` if a device has been removed; `false` otherwise.
     */
    delete(deviceOrId) {
        const id = deviceOrId instanceof devices_1.Device ? deviceOrId.id : deviceOrId;
        const device = this.devices.get(id);
        if (device !== undefined) {
            this.devices.delete(id);
            // emit a `remove` event
            this.emit('remove', device);
            return true;
        }
        return false;
    }
    /**
     * Removes all devices.
     */
    clear() {
        // emit `remove` events for all devices
        for (const [, device] of this.devices) {
            this.emit('remove', device);
        }
        this.devices.clear();
    }
    /**
     * Registers a device discoverer, making discovered devices be added to this library.
     * @param discoverer - The discoverer to register.
     */
    registerDiscoverer(discoverer) {
        discoverer.on('discover', this.discoverHandler);
    }
    /**
     * Unregisters a previously registered device discoverer.
     * @param discoverer - The discoverer to unregister.
     */
    unregisterDiscoverer(discoverer) {
        discoverer.removeListener('discover', this.discoverHandler);
    }
    /**
     * Retrieves configuration options for the device with the given ID.
     * @param deviceId - Device ID.
     */
    getDeviceOptions(deviceId) {
        // get all options (with defaults)
        let opts = undefined;
        const deviceOptions = this.options.deviceOptions;
        if (deviceOptions instanceof Map) {
            opts = deviceOptions.get(deviceId);
        }
        else if (typeof deviceOptions === 'function') {
            opts = deviceOptions(deviceId);
        }
        return { ...DEFAULT_DEVICE_OPTIONS, ...(opts || {}) };
    }
    /**
     * Creates an `RpcHandler` for a device.
     * @param identifiers - A set of device identifiers.
     * @param options - Configuration options for the device.
     */
    createRpcHandler(identifiers, options) {
        if (options.protocol === 'websocket' && identifiers.hostname) {
            const opts = { ...this.options.websocket, password: options.password };
            return this.websocket.create(identifiers.hostname, opts);
        }
        // we're missing something
        throw new Error(`Missing required device identifier(s) (device ID: ${identifiers.deviceId}, protocol: ${options.protocol})`);
    }
    /**
     * Handles 'discover' events from device discoverers.
     */
    async handleDiscoveredDevice(identifiers) {
        var _a, _b;
        let deviceId = identifiers.deviceId;
        if (this.devices.has(deviceId) || this.pendingDevices.has(deviceId) || this.ignoredDevices.has(deviceId)) {
            // ignore if we've seen this device before
            return;
        }
        // get the configuration options for this device
        const opts = this.getDeviceOptions(deviceId);
        if (opts.exclude) {
            // exclude this device
            this.ignoredDevices.add(deviceId);
            this.emit('exclude', deviceId);
            return;
        }
        this.pendingDevices.add(deviceId);
        try {
            // create an RPC handler
            const rpcHandler = this.createRpcHandler(identifiers, opts);
            // load info about this device
            const info = await rpcHandler.request('Shelly.GetDeviceInfo');
            // make sure the returned device ID matches
            if (info.id.toLowerCase() !== deviceId.toLowerCase()) {
                if (((_a = info.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === deviceId.toLowerCase()) {
                    // Change deviceId to received
                    deviceId = info.id;
                }
                else {
                    throw new Error(`Unexpected device ID (returned: ${info.id}, expected: ${deviceId})`);
                }
            }
            // get the device class for this model
            const cls = devices_1.Device.getClass((_b = info.model) !== null && _b !== void 0 ? _b : '');
            if (cls === undefined) {
                // abort if we don't have a matching device class
                this.ignoredDevices.add(deviceId);
                this.emit('unknown', deviceId, info.model, identifiers);
                return;
            }
            // create the device
            const device = new cls(info, rpcHandler);
            if (this.options.autoLoadStatus === true) {
                // load its status
                await device.loadStatus();
            }
            if (this.options.autoLoadConfig === true) {
                // load its config
                await device.loadConfig();
            }
            this.pendingDevices.delete(deviceId);
            if (this.has(deviceId)) {
                this.delete(deviceId);
            }
            this.add(device);
        }
        catch (e) {
            this.pendingDevices.delete(deviceId);
            // create a custom Error
            const message = e instanceof Error ? e.message : String(e);
            const error = new Error(`Failed to add discovered device (id: ${deviceId}): ${message}`);
            if (e instanceof Error) {
                error.stack = e.stack;
            }
            else {
                Error.captureStackTrace(error);
            }
            // emit the error
            this.emit('error', deviceId, error);
        }
    }
}
exports.Shellies = Shellies;
//# sourceMappingURL=shellies.js.map