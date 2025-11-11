import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface VoltmeterAttributes {
    id: number;
    voltage: number | null;
    xvoltage: number | null;
    errors?: string[];
}
export interface VoltmeterXVoltageConfig {
    expr: string | null;
    unit: string | null;
}
export interface VoltmeterConfig {
    id: number;
    name: string | null;
    report_thr: number;
    range: number;
    xvoltage: VoltmeterXVoltageConfig;
}
/**
 * The Voltmeter component handles the monitoring of the device's voltmeter sensors.
 */
export declare class Voltmeter extends ComponentWithId<VoltmeterAttributes, VoltmeterConfig> implements VoltmeterAttributes {
    /**
     * Voltage in volts (null if a valid value could not be obtained).
     */
    readonly voltage: number | null;
    /**
     * voltage transformed with config.xvoltage.expr. Present only when both config.xvoltage.expr and config.xvoltage.unit
     * are set to non-empty values. null if config.xvoltage.expr cannot be evaluated.
     */
    readonly xvoltage: number | null;
    /**
     * Shown only if at least one error is present. May contain out_of_range, read when there is a problem reading sensor.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
}
//# sourceMappingURL=voltmeter.d.ts.map