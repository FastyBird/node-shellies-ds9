"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const base_1 = require("./base");
/**
 * The system component provides information about general device status, resource usage, availability of firmware updates, etc.
 */
class System extends base_1.Component {
    constructor(device) {
        super('Sys', device);
        /**
         * Mac address of the device.
         */
        this.mac = '';
        /**
         * True if restart is required, false otherwise.
         */
        this.restart_required = false;
        /**
         * Current time in the format HH:MM (24-hour time format in the current timezone with leading zero).
         * Null when time is not synced from the NTP server.
         */
        this.time = '';
        /**
         * Unix timestamp (in UTC), null when time is not synced from the NTP server.
         */
        this.unixtime = 0;
        /**
         * Last time the system synced time from the NTP server (in UTC), null when time is not synced from the NTP server.
         */
        this.last_sync_ts = null;
        /**
         * Time in seconds since the last reboot.
         */
        this.uptime = 0;
        /**
         * Total size of the RAM in the system in Bytes.
         */
        this.ram_size = 0;
        /**
         * Size of the free RAM in the system in Bytes.
         */
        this.ram_free = 0;
        /**
         * Total size of the file system in Bytes.
         */
        this.fs_size = 0;
        /**
         * Size of the free file system in Bytes.
         */
        this.fs_free = 0;
        /**
         * Configuration revision number.
         */
        this.cfg_rev = 0;
        /**
         * KVS (Key-Value Store) revision number.
         */
        this.kvs_rev = 0;
        /**
         * Information about available updates, similar to the one returned by Shelly.CheckForUpdate
         */
        this.available_updates = {};
        /**
         * Time offset (in seconds). This is the difference between the device's local time and UTC.
         */
        this.utc_offset = 0;
    }
    handleEvent(event) {
        switch (event.event) {
            case 'ota_begin':
                this.emit('otaBegin', event.msg);
                break;
            case 'ota_progress':
                this.emit('otaProgress', event.progress_percent, event.msg);
                break;
            case 'ota_success':
                this.emit('otaSuccess', event.msg);
                break;
            case 'ota_error':
                this.emit('otaError', event.msg);
                break;
            case 'sleep':
                this.emit('sleep');
                break;
            case 'scheduled_restart':
                this.emit('scheduledRestart');
                break;
            case 'component_added':
                this.emit('componentAdded', event.target);
                break;
            case 'component_removed':
                this.emit('componentRemoved', event.target);
                break;
            default:
                super.handleEvent(event);
        }
    }
}
__decorate([
    base_1.characteristic
], System.prototype, "mac", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "restart_required", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "time", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "unixtime", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "last_sync_ts", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "uptime", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "ram_size", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "ram_free", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "fs_size", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "fs_free", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "cfg_rev", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "kvs_rev", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "schedule_rev", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "webhook_rev", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "knx_rev", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "btrelay_rev", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "bthc_rev", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "available_updates", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "wakeup_reason", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "wakeup_period", void 0);
__decorate([
    base_1.characteristic
], System.prototype, "utc_offset", void 0);
exports.System = System;
//# sourceMappingURL=system.js.map