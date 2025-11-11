"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flood = void 0;
const base_1 = require("./base");
/**
 * The Flood component handles the monitoring of the device's flood sensors.
 */
class Flood extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Flood', device, id);
        /**
         * Alarm state
         */
        this.alarm = false;
        /**
         * Mute state
         */
        this.mute = false;
    }
}
__decorate([
    base_1.characteristic
], Flood.prototype, "alarm", void 0);
__decorate([
    base_1.characteristic
], Flood.prototype, "mute", void 0);
__decorate([
    base_1.characteristic
], Flood.prototype, "errors", void 0);
exports.Flood = Flood;
//# sourceMappingURL=flood.js.map