import { Component } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';
export interface SystemFirmwareUpdate {
    stable?: {
        version: string;
    };
    beta?: {
        version: string;
    };
}
export interface SystemWakeupReason {
    boot: 'poweron' | 'software_restart' | 'deepsleep_wake' | 'internal' | 'unknown';
    cause: 'button' | 'usb' | 'periodic' | 'status_update' | 'undefined';
}
export interface SystemAttributes {
    mac: string;
    restart_required: boolean;
    time: string;
    unixtime: number;
    last_sync_ts: number | null;
    uptime: number;
    ram_size: number;
    ram_free: number;
    fs_size: number;
    fs_free: number;
    cfg_rev: number;
    kvs_rev: number;
    schedule_rev?: number;
    webhook_rev?: number;
    knx_rev?: number;
    btrelay_rev?: number;
    bthc_rev?: number;
    available_updates: SystemFirmwareUpdate;
    wakeup_reason?: SystemWakeupReason;
    wakeup_period?: number;
    utc_offset: number;
}
export interface SystemConfig {
    device: {
        name: string;
        eco_mode: boolean;
        mac: string;
        fw_id: string;
        profile?: string;
        discoverable: boolean;
        addon_type?: string | null;
        sys_btn_toggle?: boolean;
    };
    location: {
        tz: string | null;
        lat: number | null;
        lon: number | null;
    };
    debug: {
        mqtt: {
            enable: boolean;
        };
        websocket: {
            enable: boolean;
        };
        udp: {
            addr: string | null;
        };
    };
    ui_data: Record<string, unknown>;
    rpc_udp: {
        dst_addr: string | null;
        listen_port: number | null;
    };
    sntp: {
        server: string;
    };
    sleep?: {
        wakeup_period: number;
    };
    cfg_rev: number;
}
/**
 * The system component provides information about general device status, resource usage, availability of firmware updates, etc.
 */
export declare class System extends Component<SystemAttributes, SystemConfig> implements SystemAttributes {
    /**
     * Mac address of the device.
     */
    readonly mac: string;
    /**
     * True if restart is required, false otherwise.
     */
    readonly restart_required: boolean;
    /**
     * Current time in the format HH:MM (24-hour time format in the current timezone with leading zero).
     * Null when time is not synced from the NTP server.
     */
    readonly time: string;
    /**
     * Unix timestamp (in UTC), null when time is not synced from the NTP server.
     */
    readonly unixtime: number;
    /**
     * Last time the system synced time from the NTP server (in UTC), null when time is not synced from the NTP server.
     */
    readonly last_sync_ts: number | null;
    /**
     * Time in seconds since the last reboot.
     */
    readonly uptime: number;
    /**
     * Total size of the RAM in the system in Bytes.
     */
    readonly ram_size: number;
    /**
     * Size of the free RAM in the system in Bytes.
     */
    readonly ram_free: number;
    /**
     * Total size of the file system in Bytes.
     */
    readonly fs_size: number;
    /**
     * Size of the free file system in Bytes.
     */
    readonly fs_free: number;
    /**
     * Configuration revision number.
     */
    readonly cfg_rev: number;
    /**
     * KVS (Key-Value Store) revision number.
     */
    readonly kvs_rev: number;
    /**
     * Schedules revision number, present if schedules are enabled.
     */
    readonly schedule_rev: number | undefined;
    /**
     * The amount of webhook revision, present if webhooks are enabled.
     */
    readonly webhook_rev: number | undefined;
    /**
     * KNX configuration revision number, present on devices supporting KNX with KNX enabled.
     */
    readonly knx_rev: number | undefined;
    /**
     * BLE cloud relay configuration revision number, present on devices supporting BLE cloud relay functionality.
     */
    readonly btrelay_rev: number | undefined;
    /**
     * BTHomeControl configuration revision number, present when the device supports control with BLU devices.
     */
    readonly bthc_rev: number | undefined;
    /**
     * Information about available updates, similar to the one returned by Shelly.CheckForUpdate
     */
    readonly available_updates: SystemFirmwareUpdate;
    /**
     * Information about boot type and cause (only for battery-operated devices).
     */
    readonly wakeup_reason: SystemWakeupReason | undefined;
    /**
     * Period (in seconds) at which a device wakes up and sends "keep-alive" packet to cloud, readonly.
     * Count starts from the last full wakeup.
     */
    readonly wakeup_period: number | undefined;
    /**
     * Time offset (in seconds). This is the difference between the device's local time and UTC.
     */
    readonly utc_offset: number;
    constructor(device: Device);
    handleEvent(event: RpcEvent): void;
}
//# sourceMappingURL=system.d.ts.map