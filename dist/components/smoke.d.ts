import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface SmokeAttributes {
    id: number;
    alarm: boolean;
    mute: boolean;
}
export interface SmokeConfig {
    id: number;
    name: string | null;
}
/**
 * The Smoke component handles the monitoring of device's smoke sensors.
 */
export declare class Smoke extends ComponentWithId<SmokeAttributes, SmokeConfig> implements SmokeAttributes {
    /**
     * Alarm state
     */
    readonly alarm: boolean;
    /**
     * Mute state
     */
    readonly mute: boolean;
    constructor(device: Device, id?: number);
    /**
     * This method mutes alarm of the associated smoke sensor.
     */
    muteAlarm(): PromiseLike<null>;
}
//# sourceMappingURL=smoke.d.ts.map