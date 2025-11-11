import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface CoverEnergyCounterAttributes {
    total: number;
    by_minute: number[];
    minute_ts: number;
}
export interface CoverTemperatureAttributes {
    tC: number | null;
    tF: number | null;
}
export interface CoverAttributes {
    id: number;
    source: string;
    state: 'open' | 'closed' | 'opening' | 'closing' | 'stopped' | 'calibrating';
    apower: number;
    voltage: number;
    current: number;
    pf: number;
    freq: number;
    aenergy: CoverEnergyCounterAttributes;
    current_pos: number | null;
    target_pos: number | null;
    move_timeout?: number;
    move_started_at?: number;
    pos_control: boolean;
    last_direction: 'open' | 'close' | null;
    temperature?: CoverTemperatureAttributes;
    slat_pos?: number | null;
    errors?: string[];
}
export interface CoverAcMotorConfig {
    idle_power_thr: number;
    idle_confirm_period: number;
}
export interface CoverObstructionDetectionConfig {
    enable: boolean;
    direction: 'open' | 'close' | 'both';
    action: 'stop' | 'reverse';
    power_thr: number;
    holdoff: number;
}
export interface CoverSafetySwitchConfig {
    enable: boolean;
    direction: 'open' | 'close' | 'both';
    action: 'stop' | 'reverse' | 'pause';
    allowed_move: 'reverse' | null;
}
export interface CoverSlatConfig {
    enable: boolean;
    open_time: number;
    close_time: number;
    step: number;
    retain_pos: boolean;
    precise_ctl: boolean;
}
export interface CoverConfig {
    id: number;
    name: string | null;
    in_mode?: 'single' | 'dual' | 'detached';
    in_locked: boolean;
    initial_state: 'open' | 'closed' | 'stopped';
    power_limit: number;
    voltage_limit: number;
    current_limit: number;
    motor?: CoverAcMotorConfig;
    maxtime_open: number;
    maxtime_close: number;
    swap_inputs?: boolean;
    invert_directions: boolean;
    maintenance_mode: boolean;
    obstruction_detection: CoverObstructionDetectionConfig;
    safety_switch?: CoverSafetySwitchConfig;
    slat?: CoverSlatConfig;
}
export interface CoverResetCountersResponse {
    aenergy: {
        total: number;
    };
}
/**
 * The Cover component handles the operation of motorized garage doors, window blinds, roof skylights, etc.
 */
export declare class Cover extends ComponentWithId<CoverAttributes, CoverConfig> implements CoverAttributes {
    /**
     * Source of the last command.
     */
    readonly source: string;
    /**
     * The current state.
     */
    readonly state: 'open' | 'closed' | 'opening' | 'closing' | 'stopped' | 'calibrating';
    /**
     * Active power in Watts.
     */
    readonly apower: number;
    /**
     * Volts.
     */
    readonly voltage: number;
    /**
     * Amperes.
     */
    readonly current: number;
    /**
     * power factor.
     */
    readonly pf: number;
    /**
     * network frequency, Hz.
     */
    readonly freq: number;
    /**
     * Energy counter information, same as in the Switch component status.
     */
    readonly aenergy: CoverEnergyCounterAttributes;
    /**
     * Only present if Cover is calibrated.
     * Represents the current position in percent from 0 (fully closed) to 100 (fully open); null if the position is unknown.
     */
    readonly current_pos: number | null;
    /**
     * Only present if Cover is calibrated and is actively moving to a requested position in either open or closed directions.
     * Represents the target position in percent from 0 (fully closed) to 100 (fully open); null if the target position has been
     * reached or the movement was canceled.
     */
    readonly target_pos: number | null;
    /**
     * Seconds, only present if Cover is actively moving in either open or closed directions.
     * Cover will automatically stop after the timeout expires.
     */
    readonly move_timeout: number | undefined;
    /**
     * Only present if Cover is actively moving in either open or closed directions. Represents the time at which the
     * movement has begun.
     */
    readonly move_started_at: number | undefined;
    /**
     * False if Cover is not calibrated and only discrete open/close is possible; true if Cover is calibrated and can be
     * commanded to go to arbitrary positions between fully open and fully closed.
     */
    readonly pos_control: boolean;
    /**
     * Direction of the last movement: open/close or null when unknown.
     */
    readonly last_direction: 'open' | 'close' | null;
    /**
     * Temperature sensor information, only present if a temperature monitor is associated with the Cover instance.
     */
    readonly temperature: CoverTemperatureAttributes | undefined;
    /**
     * Only present if slat control is supported and enabled. Represents current slat position in percent
     * from 0 (fully closed) to 100 (fully open); null if the position is unknown.
     */
    readonly slat_pos?: number | null;
    /**
     * Only present if an error condition has occurred.
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
    /**
     * Starts the calibration procedure.
     */
    calibrate(): PromiseLike<null>;
    /**
     * Opens the cover.
     *
     * @param duration - Move in open direction for the specified time (in seconds).
     */
    open(duration?: number): PromiseLike<null>;
    /**
     * Closes the cover.
     *
     * @param duration - Move in close direction for the specified time (in seconds).
     */
    close(duration?: number): PromiseLike<null>;
    /**
     * Stops any ongoing movement.
     */
    stop(): PromiseLike<null>;
    /**
     * Moves the cover to the given position.
     * One, but not both, of `pos` and `rel` must be specified.
     *
     * @param pos - An absolute position (in percent).
     * @param rel - A relative position (in percent).
     * @param slat_pos - Same semantics as pos and rel but applied to slat position.
     * @param slat_rel - Same semantics as pos and rel but applied to slat position.
     */
    goToPosition(pos?: number, rel?: number, slat_pos?: number, slat_rel?: number): PromiseLike<null>;
    /**
     * This method resets associated counters.
     *
     * @param type - Array of strings, selects which counter to reset.
     */
    resetCounters(type?: string[]): PromiseLike<CoverResetCountersResponse>;
}
//# sourceMappingURL=cover.d.ts.map