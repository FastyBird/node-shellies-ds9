"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Em1 = void 0;
const base_1 = require("./base");
/**
 * EM1 component handles the data collection and processing from energy meter devices like the ShellyProEM.
 */
class Em1 extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Em1', device, id);
        /**
         * Current measurement value, [A].
         */
        this.current = null;
        /**
         * Voltage measurement value, [V].
         */
        this.voltage = null;
        /**
         * Active power measurement value, [W].
         */
        this.act_power = null;
        /**
         * Indicates factory calibration or which EM1:id is the source for calibration.
         */
        this.calibration = '';
    }
    /**
     * This method calibrates (aligns the measurements of) an instance of an EM1 component to another EM1 component (if applicable).
     *
     * @param other_id - ID of the EM1 component from witch the calibration data is taken.
     */
    calibrateFrom(other_id) {
        return this.rpc('CalibrateFrom', {
            id: this.id,
            other_id,
        });
    }
    /**
     * This method resets a user-calibrated EM1 component to its factory defaults (if applicable).
     */
    revertToFactoryCalibration() {
        return this.rpc('RevertToFactoryCalibration', {
            id: this.id,
        });
    }
    /**
     * This method gets supported CT types.
     */
    getCTTypes() {
        return this.rpc('GetCTTypes', {
            id: this.id,
        });
    }
}
__decorate([
    base_1.characteristic
], Em1.prototype, "current", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "voltage", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "act_power", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "aprt_power", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "pf", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "freq", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "calibration", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "errors", void 0);
__decorate([
    base_1.characteristic
], Em1.prototype, "flags", void 0);
exports.Em1 = Em1;
//# sourceMappingURL=em1.js.map