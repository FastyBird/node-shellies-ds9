import EventEmitter from 'eventemitter3';
import { Device, DeviceId } from './devices';
import { DeviceDiscoverer, DeviceIdentifiers } from './discovery';
import { RpcHandler, WebSocketRpcHandlerFactory, WebSocketRpcHandlerOptions } from './rpc';
/**
 * Defines configuration options for discovered devices.
 */
export interface DeviceOptions {
    /**
     * Whether this device should be excluded.
     */
    exclude: boolean;
    /**
     * The protocol to use when communicating with the device.
     */
    protocol: 'websocket';
    /**
     * The password to use if the Shelly device requires authentication.
     * This is used with WebSocket connections.
     */
    password?: string;
}
/**
 * Defines a function that takes a device ID and returns a set of configuration
 * options for that device.
 */
export type DeviceOptionsCallback = (deviceId: DeviceId) => Partial<DeviceOptions> | undefined;
/**
 * Defines configuration options for the `Shellies` class.
 */
export interface ShelliesOptions {
    /**
     * Configuration options for WebSockets.
     */
    websocket?: WebSocketRpcHandlerOptions;
    /**
     * Whether the status should be loaded automatically for discovered devices.
     */
    autoLoadStatus: boolean;
    /**
     * Whether the config should be loaded automatically for discovered devices.
     */
    autoLoadConfig: boolean;
    /**
     * Configuration options for devices.
     */
    deviceOptions: Map<DeviceId, Partial<DeviceOptions>> | DeviceOptionsCallback | null;
}
type ShelliesEvents = {
    /**
     * The 'add' event is emitted when a new device has been added.
     */
    add: (device: Device) => void;
    /**
     * The 'remove' event is emitted when a device has been removed.
     */
    remove: (device: Device) => void;
    /**
     * The 'error' event is emitted if an error occurs asynchronously.
     */
    error: (deviceId: DeviceId, error: Error) => void;
    /**
     * The 'exclude' event is emitted when a discovered device is ignored.
     */
    exclude: (deviceId: DeviceId) => void;
    /**
     * The 'unknown' event is emitted when a device with an unrecognized model designation is discovered.
     */
    unknown: (deviceId: DeviceId, model: string, identifiers: DeviceIdentifiers) => void;
};
/**
 * This is the main class for the shellies-ds9 library.
 * This class manages a list of Shelly devices. New devices can be added by registering a device discoverer.
 */
export declare class Shellies extends EventEmitter<ShelliesEvents> {
    /**
     * Factory used to create new `WebSocketRpcHandler`s.
     */
    readonly websocket: WebSocketRpcHandlerFactory;
    /**
     * Holds configuration options for this class.
     */
    protected options: ShelliesOptions;
    /**
     * Holds all devices, mapped to their IDs for quick and easy access.
     */
    protected readonly devices: Map<DeviceId, Device>;
    /**
     * Event handlers bound to `this`.
     */
    protected readonly discoverHandler: (identifiers: DeviceIdentifiers) => Promise<void>;
    /**
     * Holds IDs of devices that have been discovered but not yet added.
     */
    protected readonly pendingDevices: Set<string>;
    /** Invalidates discoveries that were still loading when clear() was called. */
    private discoveryGeneration;
    /**
     * Holds IDs of devices that have been discovered but are excluded or whose
     * model designation isn't recognized.
     */
    protected readonly ignoredDevices: Set<string>;
    /**
     * @param opts - A set of configuration options.
     */
    constructor(opts?: Partial<ShelliesOptions>);
    /**
     * The number of devices.
     */
    get size(): number;
    /**
     * Adds a device. If a device with the same ID has already been added, an
     * error will be thrown.
     * @param device - The device to add.
     */
    add(device: Device): this;
    /**
     * Determines whether a device has been added.
     * @param deviceOrId - The device or device ID to test.
     * @returns `true` if the device has been added; `false` otherwise.
     */
    has(deviceOrId: Device | DeviceId): boolean;
    /**
     * Returns the device with the given ID, or `undefined` if no such device was
     * found.
     */
    get(deviceId: DeviceId): Device | undefined;
    /**
     * Executes a provided function once for each device.
     * @param callback - Function to execute for each device.
     * @param thisArg - Value to be used as `this` when executing `callback`.
     */
    forEach(callback: (device: Device, id: DeviceId, set: Shellies) => void, thisArg?: any): void;
    /**
     * Returns a new Iterator object that contains an array of
     * `[DeviceId, Device]` for each device.
     */
    entries(): IterableIterator<[DeviceId, Device]>;
    /**
     * Returns a new Iterator object that contains the device IDs for each device.
     */
    keys(): IterableIterator<DeviceId>;
    /**
     * Returns a new Iterator object that contains each device.
     */
    values(): IterableIterator<Device>;
    /**
     * Returns a new Iterator object that contains each device.
     */
    [Symbol.iterator](): IterableIterator<Device>;
    /**
     * Removes a device and starts closing its RPC connection.
     * @param deviceOrId - The device or ID of the device to remove.
     * @returns `true` if a device has been removed; `false` otherwise.
     */
    delete(deviceOrId: Device | DeviceId): boolean;
    /**
     * Removes all devices and starts closing their RPC connections.
     * Discoveries already in flight are discarded when their current load finishes.
     */
    clear(): void;
    private closeDeviceConnection;
    /**
     * Registers a device discoverer, making discovered devices be added to this library.
     * @param discoverer - The discoverer to register.
     */
    registerDiscoverer(discoverer: DeviceDiscoverer): void;
    /**
     * Unregisters a previously registered device discoverer.
     * @param discoverer - The discoverer to unregister.
     */
    unregisterDiscoverer(discoverer: DeviceDiscoverer): void;
    /**
     * Retrieves configuration options for the device with the given ID.
     * @param deviceId - Device ID.
     */
    protected getDeviceOptions(deviceId: DeviceId): DeviceOptions;
    /**
     * Creates an `RpcHandler` for a device.
     * @param identifiers - A set of device identifiers.
     * @param options - Configuration options for the device.
     */
    protected createRpcHandler(identifiers: DeviceIdentifiers, options: DeviceOptions): RpcHandler;
    /**
     * Handles 'discover' events from device discoverers.
     */
    protected handleDiscoveredDevice(identifiers: DeviceIdentifiers): Promise<void>;
}
export {};
//# sourceMappingURL=shellies.d.ts.map