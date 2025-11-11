import { ComponentWithId } from './base';
import { Device } from '../devices';
export interface RgbTransitionAttributes {
    target: {
        output: boolean;
        rgb: number[];
        brightness: number;
    };
    started_at: number;
    duration: number;
}
export interface RgbTemperatureAttributes {
    tC: number | null;
    tF: number | null;
}
export interface RgbEnergyCounterAttributes {
    total: number;
    by_minute: number[];
    minute_ts: number;
}
export interface RgbAttributes {
    id: number;
    source: string;
    output: boolean;
    rgb: number[];
    brightness: number;
    timer_started_at?: number;
    timer_duration?: number;
    transition?: RgbTransitionAttributes;
    temperature?: RgbTemperatureAttributes;
    aenergy?: RgbEnergyCounterAttributes;
    apower?: number;
    voltage?: number;
    current?: number;
    errors?: string[];
}
export interface RgbNightModeConfig {
    enable: boolean;
    brightness: number | null;
    rgb: number[] | null;
    active_between?: string[];
}
export interface RgbButtonPresetsConfig {
    button_doublepush: {
        brightness: number | null;
        rgb: number[] | null;
    };
}
export interface RgbConfig {
    id: number;
    name: string | null;
    in_mode: 'follow' | 'flip' | 'activate' | 'detached' | 'dim';
    initial_state: 'off' | 'on' | 'restore_last';
    auto_on: boolean;
    auto_on_delay: number;
    auto_off: boolean;
    auto_off_delay: number;
    transition_duration: number;
    min_brightness_on_toggle: number;
    night_mode: RgbNightModeConfig;
    button_fade_rate: number;
    button_presets: RgbButtonPresetsConfig;
    current_limit?: number;
    power_limit?: number;
    voltage_limit?: number;
}
/**
 * The RGB component handles an output with possibility to change color and brightness of an RGB LED load. Component has additional on/off
 * control. It has a night mode capability that can reduce brightness in a selected period of time.
 */
export declare class Rgb extends ComponentWithId<RgbAttributes, RgbConfig> implements RgbAttributes {
    /**
     * Source of the last command, for example, init, WS_in, http, ...
     */
    readonly source: string;
    /**
     * True if the output channel is currently on, false otherwise.
     */
    readonly output: boolean;
    /**
     * Current Red, Green, Blue [r,g,b] level 0..255.
     */
    readonly rgb: number[];
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
    readonly transition?: RgbTransitionAttributes;
    /**
     * Information about the temperature (shown if applicable).
     */
    readonly temperature: RgbTemperatureAttributes;
    /**
     * Information about the active energy counter (shown if applicable).
     */
    readonly aenergy: RgbEnergyCounterAttributes | undefined;
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
     * Error conditions occurred. May contain overtemp, (shown if at least one error is present).
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
    /**
     * Sets the output and brightness level of the light.
     * At least one of `on` and `brightness` must be specified.
     *
     * @param on - Whether to switch on or off.
     * @param brightness - Brightness level.
     * @param rgb - Red, Green, Blue [r,g,b] - each value represents level between 0..255.
     * @param transition_duration - Transition time in seconds - time between change from current brightness level and color to desired
     *                              brightness level and color in request.
     * @param toggle_after - Flip-back timer, in seconds.
     * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
     */
    set(on?: boolean, brightness?: number, rgb?: number[], transition_duration?: number, toggle_after?: number, offset?: number): PromiseLike<null>;
    /**
     * This method toggles the output state.
     */
    toggle(): PromiseLike<null>;
    /**
     * This method dims up the brightness level.
     * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
     *                    If not provided, the value is defaulted to button_fade_rate.
     */
    dimUp(fade_rate?: number): PromiseLike<null>;
    /**
     * This method dims down the brightness level.
     * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
     *                    If not provided, the value is defaulted to button_fade_rate.
     */
    dimDown(fade_rate?: number): PromiseLike<null>;
    /**
     * This method stops the dimming of the brightness level.
     */
    dimStop(): PromiseLike<null>;
}
//# sourceMappingURL=rgb.d.ts.map