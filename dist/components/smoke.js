"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Smoke = void 0;
const base_1 = require("./base");
/**
 * The Smoke component handles the monitoring of device's smoke sensors.
 */
class Smoke extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Smoke', device, id);
        /**
         * Alarm state
         */
        this.alarm = false;
        /**
         * Mute state
         */
        this.mute = false;
    }
    /**
     * This method mutes alarm of the associated smoke sensor.
     */
    muteAlarm() {
        return this.rpc('Mute', {
            id: this.id,
        });
    }
}
__decorate([
    base_1.characteristic
], Smoke.prototype, "alarm", void 0);
__decorate([
    base_1.characteristic
], Smoke.prototype, "mute", void 0);
exports.Smoke = Smoke;
//# sourceMappingURL=smoke.js.map