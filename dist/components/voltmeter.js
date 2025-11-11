"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voltmeter = void 0;
const base_1 = require("./base");
/**
 * The Voltmeter component handles the monitoring of the device's voltmeter sensors.
 */
class Voltmeter extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Voltmeter', device, id);
        /**
         * Voltage in volts (null if a valid value could not be obtained).
         */
        this.voltage = null;
        /**
         * voltage transformed with config.xvoltage.expr. Present only when both config.xvoltage.expr and config.xvoltage.unit
         * are set to non-empty values. null if config.xvoltage.expr cannot be evaluated.
         */
        this.xvoltage = null;
    }
}
__decorate([
    base_1.characteristic
], Voltmeter.prototype, "voltage", void 0);
__decorate([
    base_1.characteristic
], Voltmeter.prototype, "xvoltage", void 0);
__decorate([
    base_1.characteristic
], Voltmeter.prototype, "errors", void 0);
exports.Voltmeter = Voltmeter;
//# sourceMappingURL=voltmeter.js.map