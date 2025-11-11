import { Component } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';
export interface WiFiAttributes {
    sta_ip: string | null;
    status: 'disconnected' | 'connecting' | 'connected' | 'got ip';
    ssid: string | null;
    bssid?: string;
    rssi: number;
    ap_client_count?: number;
}
export interface WiFiApConfig {
    ssid: string | null;
    pass: string | null;
    is_open: boolean;
    enable: boolean;
    range_extender?: {
        enable: boolean;
    };
}
export interface WiFiStationConfig {
    ssid: string | null;
    pass: string | null;
    is_open: boolean;
    enable: boolean;
    ipv4mode: 'dhcp' | 'static';
    ip: string | null;
    netmask: string | null;
    gw: string | null;
    nameserver: string | null;
}
export interface WiFiRoamingConfig {
    rssi_thr: number;
    interval: number;
}
export interface WiFiConfig {
    ap: WiFiApConfig;
    sta: WiFiStationConfig;
    sta1: WiFiStationConfig;
    roam: WiFiRoamingConfig;
}
export interface WiFiScanResponse {
    results: Array<{
        ssid: string | null;
        bssid: string;
        auth: 0 | 1 | 2 | 3 | 4 | 5;
        channel: number;
        rssi: number;
    }>;
}
export interface WiFiListApClientsResponse {
    ts: number | null;
    ap_clients: Array<{
        mac: string;
        ip: string;
        ip_static: boolean;
        mport: number;
        since: number;
    }>;
}
/**
 * The WiFi component handles wireless connection services of a device.
 */
export declare class WiFi extends Component<WiFiAttributes, WiFiConfig> implements WiFiAttributes {
    /**
     * Ip of the device in the network (null if disconnected)
     */
    readonly sta_ip: string | null;
    /**
     * Status of the connection. Range of values: disconnected, connecting, connected, got ip.
     */
    readonly status: 'disconnected' | 'connecting' | 'connected' | 'got ip';
    /**
     * SSID of the network (null if disconnected).
     */
    readonly ssid: string | null;
    /**
     * BSSID of the currently connected AP, only when connected
     */
    readonly bssid: string | undefined;
    /**
     * Strength of the signal in dBms.
     */
    readonly rssi: number;
    /**
     * Number of clients connected to the access point. Present only when AP is enabled and range extender
     * functionality is present and enabled.
     */
    readonly ap_client_count: number | undefined;
    constructor(device: Device);
    /**
     * Retrieves a list of available networks.
     */
    scan(): PromiseLike<WiFiScanResponse>;
    /**
     * Returns a list of clients currently connected to the device's access point.
     */
    listApClients(): PromiseLike<WiFiListApClientsResponse>;
    handleEvent(event: RpcEvent): void;
}
//# sourceMappingURL=wifi.d.ts.map