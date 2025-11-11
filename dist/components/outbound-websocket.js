"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboundWebSocket = void 0;
const base_1 = require("./base");
/**
 * The Outbound Websocket component makes it possible to configure a Gen2+ Shelly device to establish and maintain an outbound
 * websocket connection.
 */
class OutboundWebSocket extends base_1.Component {
    constructor(device) {
        super('Ws', device);
        /**
         * True if a device is connected to a websocket outbound connection or false otherwise.
         */
        this.connected = false;
    }
}
__decorate([
    base_1.characteristic
], OutboundWebSocket.prototype, "connected", void 0);
exports.OutboundWebSocket = OutboundWebSocket;
//# sourceMappingURL=outbound-websocket.js.map