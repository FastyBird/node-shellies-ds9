"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloud = void 0;
const base_1 = require("./base");
/**
 * The cloud component is called Cloud. It handles cloud services of a device.
 */
class Cloud extends base_1.Component {
    constructor(device) {
        super('Cloud', device);
        /**
         * True if the device is connected to the Shelly cloud, false otherwise.
         */
        this.connected = false;
    }
}
__decorate([
    base_1.characteristic
], Cloud.prototype, "connected", void 0);
exports.Cloud = Cloud;
//# sourceMappingURL=cloud.js.map