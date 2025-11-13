import mDNS from 'multicast-dns';
import { DeviceDiscoverer } from './base';
/**
 * Defines options that are passed along to the multicast-dns library.
 */
export interface MdnsOptions {
    /**
     * The network interface to use. If none is specified, all available
     * interfaces will be used.
     */
    interface?: string;
}
/**
 * A service that can discover Shelly devices using mDNS.
 */
export declare class MdnsDeviceDiscoverer extends DeviceDiscoverer {
    /**
     * A reference to the multicast-dns library.
     */
    protected mdns: mDNS.MulticastDNS | null;
    /**
     * Options for the multicast-dns library.
     */
    protected mdnsOptions: MdnsOptions;
    /**
     * @param mdnsOptions - Options for the multicast-dns library.
     */
    constructor(mdnsOptions?: MdnsOptions);
    /**
     * Makes this service start listening for new Shelly devices.
     */
    start(): Promise<void>;
    /**
     * Validates the given network interface name or address.
     * @param iface - An interface name or address.
     * @returns If a valid interface name is given, the address for that interface
     * is returned. If a valid address is given, that same address is returned.
     * @throws Throws an error if the given name or address could not be found.
     */
    protected getNetworkInterface(iface: string | undefined): string | undefined;
    /**
     * Returns a promise that will resolve once the mDNS socket is ready.
     */
    protected waitUntilReady(): Promise<void>;
    /**
     * Queries for Shelly devices.
     */
    protected sendQuery(): Promise<void>;
    /**
     * Makes this service stop searching for new Shelly devices.
     */
    stop(): Promise<void>;
    /**
     * Destroys the mDNS instance, closing the socket.
     */
    protected destroy(): Promise<void>;
    /**
     * Handles mDNS response packets by parsing them and emitting `discover`
     * events.
     * @param response - The response packets.
     */
    protected handleResponse(response: mDNS.ResponsePacket): void;
    private parseTxtData;
}
//# sourceMappingURL=mdns.d.ts.map