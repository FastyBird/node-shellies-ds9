import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface EmAttributes {
    id: number;
    a_current: number | null;
    a_voltage: number | null;
    a_act_power: number | null;
    a_aprt_power: number | null;
    a_pf: number | null;
    a_freq: number | null;
    a_errors?: string[];
    b_current: number | null;
    b_voltage: number | null;
    b_act_power: number | null;
    b_aprt_power: number | null;
    b_pf: number | null;
    b_freq: number | null;
    b_errors?: string[];
    c_current: number | null;
    c_voltage: number | null;
    c_act_power: number | null;
    c_aprt_power: number | null;
    c_pf: number | null;
    c_freq: number | null;
    c_errors?: string[];
    n_current: number | null;
    n_errors?: string[];
    total_current: number | null;
    total_act_power: number | null;
    total_aprt_power: number | null;
    user_calibrated_phase: string[];
    errors?: string[];
}
export interface EmReverseConfig {
    a: boolean;
    b: boolean;
    c: boolean;
}
export interface EmConfig {
    id: number;
    name: string | null;
    blink_mode_selector: 'active_energy' | 'apparent_energy';
    phase_selector: 'a' | 'b' | 'c' | 'all';
    monitor_phase_sequence: boolean;
    reverse: EmReverseConfig;
    ct_type: string;
}
export interface EmGetCTTypeResponse {
    supported: string[];
}
export interface EmPhaseToPhaseCalibrateResponse {
    restart_required: boolean;
}
export interface EmPhaseToPhaseCalibrateResetResponse {
    restart_required: boolean;
}
/**
 * EM (Energy Meter) component handles the data collection and processing from energy meter devices like the ShellyPro3EM.
 */
export declare class Em extends ComponentWithId<EmAttributes, EmConfig> implements EmAttributes {
    /**
     * Phase A current measurement value, [A].
     */
    readonly a_current: number | null;
    /**
     * Phase A voltage measurement value, [V].
     */
    readonly a_voltage: number | null;
    /**
     * Phase A active power measurement value, [W].
     */
    readonly a_act_power: number | null;
    /**
     * Phase A apparent power measurement value, [VA].
     */
    readonly a_aprt_power: number | null;
    /**
     * Phase A power factor measurement value.
     */
    readonly a_pf: number | null;
    /**
     * Phase A network frequency measurement value.
     */
    readonly a_freq: number | null;
    /**
     * Phase A error conditions occurred. May contain out_of_range: active_power, out_of_range: apparent_power,
     * out_of_range:voltage, out_of_range: current, (shown if at least one error is present).
     */
    readonly a_errors: string[] | undefined;
    /**
     * Phase A current measurement value, [A].
     */
    readonly b_current: number | null;
    /**
     * Phase A voltage measurement value, [V].
     */
    readonly b_voltage: number | null;
    /**
     * Phase A active power measurement value, [W].
     */
    readonly b_act_power: number | null;
    /**
     * Phase A apparent power measurement value, [VA].
     */
    readonly b_aprt_power: number | null;
    /**
     * Phase A power factor measurement value.
     */
    readonly b_pf: number | null;
    /**
     * Phase A network frequency measurement value.
     */
    readonly b_freq: number | null;
    /**
     * Phase A error conditions occurred. May contain out_of_range: active_power, out_of_range: apparent_power,
     * out_of_range:voltage, out_of_range: current, (shown if at least one error is present).
     */
    readonly b_errors: string[] | undefined;
    /**
     * Phase A current measurement value, [A].
     */
    readonly c_current: number | null;
    /**
     * Phase A voltage measurement value, [V].
     */
    readonly c_voltage: number | null;
    /**
     * Phase A active power measurement value, [W].
     */
    readonly c_act_power: number | null;
    /**
     * Phase A apparent power measurement value, [VA].
     */
    readonly c_aprt_power: number | null;
    /**
     * Phase A power factor measurement value.
     */
    readonly c_pf: number | null;
    /**
     * Phase A network frequency measurement value.
     */
    readonly c_freq: number | null;
    /**
     * Phase A error conditions occurred. May contain out_of_range: active_power, out_of_range: apparent_power,
     * out_of_range:voltage, out_of_range: current, (shown if at least one error is present).
     */
    readonly c_errors: string[] | undefined;
    /**
     * Neutral current measurement value, [A] (if supported)
     */
    readonly n_current: number | null;
    /**
     * Neutral error conditions occurred. May contain out_of_range: current, (shown if error is present).
     */
    readonly n_errors: string[] | undefined;
    /**
     * Sum of the current on all phases (excluding neutral readings if available).
     */
    readonly total_current: number | null;
    /**
     * Sum of the active power on all phases.
     */
    readonly total_act_power: number | null;
    /**
     * Sum of the apparent power on all phases.
     */
    readonly total_aprt_power: number | null;
    /**
     * Indicates which phase was user calibrated.
     */
    readonly user_calibrated_phase: string[];
    /**
     * EM component error conditions. May contain power_meter_failure, phase_sequence or ct_type_not_set.
     * Present in status only if not empty.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
    /**
     * Calibrate a phase CT from another phase's CT (if applicable).
     *
     * @param from - Select the phase from witch the calibration data is taken.
     * @param to - Select the phase to witch the calibration is due.
     */
    phaseToPhaseCalibrate(from: string, to: string): PromiseLike<EmPhaseToPhaseCalibrateResponse>;
    /**
     * Reset a user calibrated CT to factory defaults (if applicable).
     *
     * @param phase - Phase for which user calibration is going to be reset.
     */
    phaseToPhaseCalibrateReset(phase: string): PromiseLike<EmPhaseToPhaseCalibrateResetResponse>;
    /**
     * This method gets supported CT types.
     */
    getCTTypes(): PromiseLike<EmGetCTTypeResponse>;
}
//# sourceMappingURL=em.d.ts.map