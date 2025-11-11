"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Em = void 0;
const base_1 = require("./base");
/**
 * EM (Energy Meter) component handles the data collection and processing from energy meter devices like the ShellyPro3EM.
 */
class Em extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Em', device, id);
        /**
         * Phase A current measurement value, [A].
         */
        this.a_current = null;
        /**
         * Phase A voltage measurement value, [V].
         */
        this.a_voltage = null;
        /**
         * Phase A active power measurement value, [W].
         */
        this.a_act_power = null;
        /**
         * Phase A apparent power measurement value, [VA].
         */
        this.a_aprt_power = null;
        /**
         * Phase A power factor measurement value.
         */
        this.a_pf = null;
        /**
         * Phase A network frequency measurement value.
         */
        this.a_freq = null;
        /**
         * Phase A current measurement value, [A].
         */
        this.b_current = null;
        /**
         * Phase A voltage measurement value, [V].
         */
        this.b_voltage = null;
        /**
         * Phase A active power measurement value, [W].
         */
        this.b_act_power = null;
        /**
         * Phase A apparent power measurement value, [VA].
         */
        this.b_aprt_power = null;
        /**
         * Phase A power factor measurement value.
         */
        this.b_pf = null;
        /**
         * Phase A network frequency measurement value.
         */
        this.b_freq = null;
        /**
         * Phase A current measurement value, [A].
         */
        this.c_current = null;
        /**
         * Phase A voltage measurement value, [V].
         */
        this.c_voltage = null;
        /**
         * Phase A active power measurement value, [W].
         */
        this.c_act_power = null;
        /**
         * Phase A apparent power measurement value, [VA].
         */
        this.c_aprt_power = null;
        /**
         * Phase A power factor measurement value.
         */
        this.c_pf = null;
        /**
         * Phase A network frequency measurement value.
         */
        this.c_freq = null;
        /**
         * Neutral current measurement value, [A] (if supported)
         */
        this.n_current = null;
        /**
         * Sum of the current on all phases (excluding neutral readings if available).
         */
        this.total_current = null;
        /**
         * Sum of the active power on all phases.
         */
        this.total_act_power = null;
        /**
         * Sum of the apparent power on all phases.
         */
        this.total_aprt_power = null;
        /**
         * Indicates which phase was user calibrated.
         */
        this.user_calibrated_phase = [];
    }
    /**
     * Calibrate a phase CT from another phase's CT (if applicable).
     *
     * @param from - Select the phase from witch the calibration data is taken.
     * @param to - Select the phase to witch the calibration is due.
     */
    phaseToPhaseCalibrate(from, to) {
        return this.rpc('PhaseToPhaseCalib', {
            id: this.id,
            from,
            to,
        });
    }
    /**
     * Reset a user calibrated CT to factory defaults (if applicable).
     *
     * @param phase - Phase for which user calibration is going to be reset.
     */
    phaseToPhaseCalibrateReset(phase) {
        return this.rpc('PhaseToPhaseCalibReset', {
            id: this.id,
            phase,
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
], Em.prototype, "a_current", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "a_voltage", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "a_act_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "a_aprt_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "a_pf", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "a_freq", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "a_errors", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "b_current", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "b_voltage", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "b_act_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "b_aprt_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "b_pf", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "b_freq", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "b_errors", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "c_current", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "c_voltage", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "c_act_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "c_aprt_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "c_pf", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "c_freq", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "c_errors", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "n_current", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "n_errors", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "total_current", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "total_act_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "total_aprt_power", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "user_calibrated_phase", void 0);
__decorate([
    base_1.characteristic
], Em.prototype, "errors", void 0);
exports.Em = Em;
//# sourceMappingURL=em.js.map