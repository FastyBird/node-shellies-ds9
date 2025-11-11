import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface FloodAttributes {
    id: number;
    alarm: boolean;
    mute: boolean;
    errors?: string[];
}
export interface FloodConfig {
    id: number;
    name: string | null;
    alarm_mode: 'disabled' | 'normal' | 'intense' | 'rain' | null;
    report_holdoff: number;
}
/**
 * The Flood component handles the monitoring of the device's flood sensors.
 */
export declare class Flood extends ComponentWithId<FloodAttributes, FloodConfig> implements FloodAttributes {
    /**
     * Alarm state
     */
    readonly alarm: boolean;
    /**
     * Mute state
     */
    readonly mute: boolean;
    /**
     * Error conditions occurred. May contain cable_unplugged, (shown if at least one error is present).
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
}
//# sourceMappingURL=flood.d.ts.map