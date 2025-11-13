"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdnsDeviceDiscoverer = void 0;
const os_1 = __importDefault(require("os"));
const multicast_dns_1 = __importDefault(require("multicast-dns"));
const base_1 = require("./base");
/**
 * Default multicast-dns options.
 */
const DEFAULT_MDNS_OPTIONS = {
    interface: undefined,
};
/**
 * The service name that Shelly devices use to advertise themselves.
 */
const SERVICE_NAMES = ['_shelly._tcp.local', '_http._tcp.local'];
/**
 * A service that can discover Shelly devices using mDNS.
 */
class MdnsDeviceDiscoverer extends base_1.DeviceDiscoverer {
    /**
     * @param mdnsOptions - Options for the multicast-dns library.
     */
    constructor(mdnsOptions) {
        super();
        /**
         * A reference to the multicast-dns library.
         */
        this.mdns = null;
        // store the multicast-dns options, with default values
        this.mdnsOptions = { ...DEFAULT_MDNS_OPTIONS, ...(mdnsOptions || {}) };
    }
    /**
     * Makes this service start listening for new Shelly devices.
     */
    async start() {
        if (this.mdns !== null) {
            return;
        }
        this.mdns = (0, multicast_dns_1.default)({
            interface: this.getNetworkInterface(this.mdnsOptions.interface),
        });
        this.mdns
            .on('response', (response) => this.handleResponse(response))
            .on('error', (error) => this.emit('error', error))
            .on('warning', (error) => this.emit('error', error));
        await this.waitUntilReady();
        await this.sendQuery();
    }
    /**
     * Validates the given network interface name or address.
     * @param iface - An interface name or address.
     * @returns If a valid interface name is given, the address for that interface
     * is returned. If a valid address is given, that same address is returned.
     * @throws Throws an error if the given name or address could not be found.
     */
    getNetworkInterface(iface) {
        if (!iface) {
            // skip if no interface has been specified
            return undefined;
        }
        // get all available interfaces
        const ifaces = os_1.default.networkInterfaces();
        // if an interface name has been given, return its address
        const ifc = ifaces[iface];
        if (ifc && ifc.length > 0) {
            // return the first address
            return ifc[0].address;
        }
        // otherwise, go through each interface and see if there is one with the
        // given address
        for (const i in ifaces) {
            const ifc = ifaces[i];
            if (!ifc) {
                continue;
            }
            for (const ii of ifc) {
                if (ii.address === iface) {
                    // address found, so it's valid
                    return ii.address;
                }
            }
        }
        // the given value doesn't match any available interface name or address
        throw new Error(`Invalid network interface "${iface}"`);
    }
    /**
     * Returns a promise that will resolve once the mDNS socket is ready.
     */
    waitUntilReady() {
        return new Promise((resolve) => {
            this.mdns.once('ready', resolve);
        });
    }
    /**
     * Queries for Shelly devices.
     */
    sendQuery() {
        const queries = SERVICE_NAMES.map((name) => new Promise((resolve, reject) => {
            this.mdns.query(name, 'PTR', (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        }));
        return Promise.allSettled(queries).then(() => undefined);
    }
    /**
     * Makes this service stop searching for new Shelly devices.
     */
    async stop() {
        if (this.mdns === null) {
            return;
        }
        await this.destroy();
        this.mdns = null;
    }
    /**
     * Destroys the mDNS instance, closing the socket.
     */
    destroy() {
        return new Promise((resolve) => {
            this.mdns.destroy(resolve);
        });
    }
    /**
     * Handles mDNS response packets by parsing them and emitting `discover`
     * events.
     * @param response - The response packets.
     */
    handleResponse(response) {
        var _a, _b;
        const answers = (_a = response.answers) !== null && _a !== void 0 ? _a : [];
        const additionals = (_b = response.additionals) !== null && _b !== void 0 ? _b : [];
        const allRecords = answers.concat(additionals);
        const ptrAnswers = answers.filter((a) => a.type === 'PTR' && SERVICE_NAMES.includes(a.name));
        if (ptrAnswers.length === 0) {
            return;
        }
        const ipMap = new Map();
        for (const a of allRecords) {
            if ((a.type === 'A' || a.type === 'AAAA') && typeof a.name === 'string' && typeof a.data === 'string') {
                if (!ipMap.has(a.name)) {
                    ipMap.set(a.name, a.data);
                }
            }
        }
        for (const ptr of ptrAnswers) {
            const instanceName = String(ptr.data);
            const [fullId] = instanceName.split('.', 1);
            const deviceId = fullId;
            // TXT data pro konkrétní instanci
            const txt = this.parseTxtData(allRecords, instanceName);
            const gen = txt.get('gen');
            if (!gen) {
                continue;
            }
            const srv = allRecords.find((a) => a.type === 'SRV' && a.name === instanceName);
            let ipAddress;
            if (srv && typeof srv.data === 'object' && srv.data && 'target' in (srv.data)) {
                const target = (srv.data).target;
                ipAddress = ipMap.get(target);
            }
            if (!ipAddress) {
                ipAddress = Array.from(ipMap.values())[0];
            }
            if (ipAddress) {
                this.handleDiscoveredDevice({
                    deviceId,
                    hostname: ipAddress,
                });
            }
        }
    }
    parseTxtData(records, name) {
        const data = new Map();
        for (const a of records) {
            if (a.type !== 'TXT') {
                continue;
            }
            if (a.name === name && Array.isArray(a.data)) {
                for (const entry of a.data) {
                    const text = typeof entry === 'string' ? entry : String(entry);
                    const [key, value] = text.split('=', 2);
                    if (key) {
                        data.set(key, value !== null && value !== void 0 ? value : '');
                    }
                }
            }
        }
        return data;
    }
}
exports.MdnsDeviceDiscoverer = MdnsDeviceDiscoverer;
//# sourceMappingURL=mdns.js.map