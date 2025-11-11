import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface LightTransitionAttributes {
    target: {
        output: boolean;
        brightness: number;
    };
    started_at: number;
    duration: number;
}
export interface LightTemperatureAttributes {
    tC: number | null;
    tF: number | null;
}
export interface LightEnergyCounterAttributes {
    total: number;
    by_minute: number[];
    minute_ts: number;
}
export interface LightCalibrationAttributes {
    progess: number;
}
export interface LightAttributes {
    id: number;
    source: string;
    output: boolean;
    brightness: number;
    timer_started_at?: number;
    timer_duration?: number;
    transition?: LightTransitionAttributes;
    temperature: LightTemperatureAttributes;
    aenergy?: LightEnergyCounterAttributes;
    apower?: number;
    voltage?: number;
    current?: number;
    errors?: string[];
    calibration?: LightCalibrationAttributes;
    flags?: ('no_load' | 'uncalibrated')[];
}
export interface LightNightModeConfig {
    enable: boolean;
    brightness: number | null;
    active_between?: string[];
}
export interface LightButtonPresetsConfig {
    button_doublepush: {
        brightness: number | null;
    };
}
export interface LightConfig {
    id: number;
    name: string | null;
    in_mode: 'follow' | 'flip' | 'activate' | 'detached' | 'dim' | 'dual_dim';
    op_mode?: number;
    initial_state: 'off' | 'on' | 'restore_last';
    auto_on: boolean;
    auto_on_delay: number;
    auto_off: boolean;
    auto_off_delay: number;
    transition_duration: number;
    min_brightness_on_toggle: number;
    night_mode: LightNightModeConfig;
    button_fade_rate: number;
    button_presets: LightButtonPresetsConfig;
    range_map: number[] | null;
    power_limit?: number;
    voltage_limit?: number;
    undervoltage_limit?: number;
    current_limit?: number;
}
export interface LightErrorResponse {
    code: number;
    message: string;
}
export interface LightResetCountersResponse {
    aenergy: {
        total: number;
    };
}
/**
 * The Light component handles a dimmable light output with additional on/off control.
 */
export declare class Light extends ComponentWithId<LightAttributes, LightConfig> implements LightAttributes {
    /**
     * Source of the last command, for example, init, WS_in, http, ...
     */
    readonly source: string;
    /**
     * True if the output channel is currently on, false otherwise.
     */
    readonly output: boolean;
    /**
     * Current brightness level (in percent).
     */
    readonly brightness: number;
    /**
     * Unix timestamp, start time of the timer (in UTC) (shown if the timer is triggered).
     */
    readonly timer_started_at: number | undefined;
    /**
     * Duration of the timer in seconds (shown if the timer is triggered).
     */
    readonly timer_duration: number | undefined;
    /**
     * Information about the transition (shown if transition is triggered).
     */
    readonly transition?: LightTransitionAttributes;
    /**
     * Information about the temperature (if applicable).
     */
    readonly temperature: LightTemperatureAttributes;
    /**
     * Information about the active energy counter (shown if applicable).
     */
    readonly aenergy: LightEnergyCounterAttributes | undefined;
    /**
     * Last measured instantaneous active power (in Watts) delivered to the attached load (shown if applicable).
     */
    readonly apower: number | undefined;
    /**
     * Last measured voltage in Volts (shown if applicable).
     */
    readonly voltage: number | undefined;
    /**
     * Last measured current in Amperes (shown if applicable).
     */
    readonly current: number | undefined;
    /**
     * Information about the calibration process, only present when calibration is running (shown if applicable).
     */
    readonly calibration?: LightCalibrationAttributes;
    /**
     * Error conditions occurred, shown if at least one error is present. Depending on component capabilities may contain:
     * overtemp, overpower, overvoltage, undervoltage, overcurrent, unsupported_load, cal_abort:interrupted, cal_abort: power_read,
     * cal_abort: no_load, cal_abort: no_synchro, cal_abort: non_dimmable, cal_abort:overpower, cal_abort: unsupported_load
     */
    readonly errors: string[] | undefined;
    /**
     * Communicates present conditions, shown if at least one flag is set.
     * Depending on component capabilities may contain: no_load, uncalibrated.
     */
    readonly flags?: ('no_load' | 'uncalibrated')[];
    constructor(device: Device, id?: number);
    /**
     * This method sets the output and brightness level of the Light component.
     *
     * @param on - True for light on, false otherwise.
     * @param brightness - Brightness level.
     * @param transition_duration - Transition time in seconds - time between change from current brightness level to desired
     *                              brightness level in request
     * @param toggle_after - Optional flip-back timer in seconds.
     * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
     */
    set(on?: boolean, brightness?: number, transition_duration?: number, toggle_after?: number, offset?: number): PromiseLike<null>;
    /**
     * This method toggles the output state.
     */
    toggle(): PromiseLike<null>;
    /**
     * This method dims up the brightness level.
     *
     * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
     *                    If not provided, the value is defaulted to button_fade_rate.
     */
    dimUp(fade_rate?: number): PromiseLike<null>;
    /**
     * This method dims down the brightness level.
     *
     * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
     *                    If not provided, the value is defaulted to button_fade_rate.
     */
    dimDown(fade_rate?: number): PromiseLike<null>;
    /**
     * This method stops the dimming of the brightness level.
     */
    dimStop(): PromiseLike<null>;
    /**
     * This method (if applicable) sets the output and brightness level of all Light components in the device.
     *
     * @param on - True for light on, false otherwise.
     * @param brightness - Brightness level.
     * @param transition_duration - Transition time in seconds - time between change from current brightness level to desired
     *                              brightness level in request
     * @param toggle_after - Optional flip-back timer in seconds.
     * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
     */
    setAll(on?: boolean, brightness?: number, transition_duration?: number, toggle_after?: number, offset?: number): PromiseLike<null>;
    /**
     * This method (if applicable) starts calibration of the device's outputs.
     */
    calibrate(): PromiseLike<LightErrorResponse | null>;
    /**
     * This method resets associated counters.
     * @param type - Array of strings, selects which counter to reset.
     */
    resetCounters(type?: string[]): PromiseLike<LightResetCountersResponse>;
}
//# sourceMappingURL=light.d.ts.map