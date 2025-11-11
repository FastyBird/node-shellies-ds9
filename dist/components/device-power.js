"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicePower = void 0;
const base_1 = require("./base");
/**
 * The DevicePower component handles the monitoring of a device's battery charge and is only available on battery-operated devices.
 */
class DevicePower extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('DevicePower', device, id);
        /**
         * Information about the battery charge.
         */
        this.battery = {
            V: null,
            percent: null,
        };
    }
}
__decorate([
    base_1.characteristic
], DevicePower.prototype, "battery", void 0);
__decorate([
    base_1.characteristic
], DevicePower.prototype, "external", void 0);
__decorate([
    base_1.characteristic
], DevicePower.prototype, "errors", void 0);
exports.DevicePower = DevicePower;
//# sourceMappingURL=device-power.js.map