import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface Em1Attributes {
    id: number;
    current: number | null;
    voltage: number | null;
    act_power: number | null;
    aprt_power?: number | null;
    pf?: number | null;
    freq?: number | null;
    calibration: string;
    errors?: string[];
    flags?: string[];
}
export interface Em1Config {
    id: number;
    name: string | null;
    reverse: boolean;
    ct_type: string;
}
export interface Em1GetCTTypeResponse {
    supported: string[];
}
export interface Em1CalibrateFromResponse {
    restart_required: boolean;
}
export interface Em1RevertToFactoryCalibrationResponse {
    restart_required: boolean;
}
/**
 * EM1 component handles the data collection and processing from energy meter devices like the ShellyProEM.
 */
export declare class Em1 extends ComponentWithId<Em1Attributes, Em1Config> implements Em1Attributes {
    /**
     * Current measurement value, [A].
     */
    readonly current: number | null;
    /**
     * Voltage measurement value, [V].
     */
    readonly voltage: number | null;
    /**
     * Active power measurement value, [W].
     */
    readonly act_power: number | null;
    /**
     * Apparent power measurement value, [VA] (if applicable).
     */
    readonly aprt_power: number | null | undefined;
    /**
     * Power factor measurement value (if applicable).
     */
    readonly pf: number | null | undefined;
    /**
     * Network frequency measurement value (if applicable).
     */
    readonly freq: number | null | undefined;
    /**
     * Indicates factory calibration or which EM1:id is the source for calibration.
     */
    readonly calibration: string;
    /**
     * EM1 component error conditions. May contain power_meter_failure, out_of_range: act_power, out_of_range: aprt_power,
     * out_of_range:voltage, out_of_range:current or ct_type_not_set. Present in status only if not empty.
     */
    readonly errors: string[] | undefined;
    /**
     * Communicates present conditions, shown if at least one flag is set. Depending on component capabilites may contain: count_disabled
     */
    readonly flags: string[] | undefined;
    constructor(device: Device, id?: number);
    /**
     * This method calibrates (aligns the measurements of) an instance of an EM1 component to another EM1 component (if applicable).
     *
     * @param other_id - ID of the EM1 component from witch the calibration data is taken.
     */
    calibrateFrom(other_id: number): PromiseLike<Em1CalibrateFromResponse>;
    /**
     * This method resets a user-calibrated EM1 component to its factory defaults (if applicable).
     */
    revertToFactoryCalibration(): PromiseLike<Em1RevertToFactoryCalibrationResponse>;
    /**
     * This method gets supported CT types.
     */
    getCTTypes(): PromiseLike<Em1GetCTTypeResponse>;
}
//# sourceMappingURL=em1.d.ts.map