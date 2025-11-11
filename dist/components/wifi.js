"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiFi = void 0;
const base_1 = require("./base");
/**
 * The WiFi component handles wireless connection services of a device.
 */
class WiFi extends base_1.Component {
    constructor(device) {
        super('WiFi', device);
        /**
         * Ip of the device in the network (null if disconnected)
         */
        this.sta_ip = null;
        /**
         * Status of the connection. Range of values: disconnected, connecting, connected, got ip.
         */
        this.status = 'disconnected';
        /**
         * SSID of the network (null if disconnected).
         */
        this.ssid = null;
        /**
         * Strength of the signal in dBms.
         */
        this.rssi = 0;
    }
    /**
     * Retrieves a list of available networks.
     */
    scan() {
        return this.rpc('Scan');
    }
    /**
     * Returns a list of clients currently connected to the device's access point.
     */
    listApClients() {
        return this.rpc('ListAPClients');
    }
    handleEvent(event) {
        switch (event.event) {
            case 'sta_connect_fail':
                this.emit('connectionError', event.reason);
                break;
            case 'sta_disconnected':
                this.emit('disconnect', event.reason, event.ssid, event.sta_ip);
                break;
            default:
                super.handleEvent(event);
        }
    }
}
__decorate([
    base_1.characteristic
], WiFi.prototype, "sta_ip", void 0);
__decorate([
    base_1.characteristic
], WiFi.prototype, "status", void 0);
__decorate([
    base_1.characteristic
], WiFi.prototype, "ssid", void 0);
__decorate([
    base_1.characteristic
], WiFi.prototype, "bssid", void 0);
__decorate([
    base_1.characteristic
], WiFi.prototype, "rssi", void 0);
__decorate([
    base_1.characteristic
], WiFi.prototype, "ap_client_count", void 0);
exports.WiFi = WiFi;
//# sourceMappingURL=wifi.js.map