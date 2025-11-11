"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temperature = void 0;
const base_1 = require("./base");
/**
 * The Temperature component handles the monitoring of the device's temperature sensors.
 */
class Temperature extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Temperature', device, id);
        /**
         * Temperature in Celsius (null if a valid value could not be obtained).
         */
        this.tC = null;
        /**
         * Temperature in Fahrenheit (null if a valid value could not be obtained).
         */
        this.tF = null;
    }
}
__decorate([
    base_1.characteristic
], Temperature.prototype, "tC", void 0);
__decorate([
    base_1.characteristic
], Temperature.prototype, "tF", void 0);
__decorate([
    base_1.characteristic
], Temperature.prototype, "errors", void 0);
exports.Temperature = Temperature;
//# sourceMappingURL=temperature.js.map