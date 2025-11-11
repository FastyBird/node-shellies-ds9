import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface RgbwTransitionAttributes {
  target: {
    output: boolean;
    rgb: number[];
    brightness: number;
    white: number;
  };
  started_at: number;
  duration: number;
}

export interface RgbwTemperatureAttributes {
  tC: number | null;
  tF: number | null;
}

export interface RgbwEnergyCounterAttributes {
  total: number;
  by_minute: number[];
  minute_ts: number;
}

export interface RgbwAttributes {
  id: number;
  source: string;
  output: boolean;
  rgb: number[];
  brightness: number;
  white: number;
  timer_started_at?: number;
  timer_duration?: number;
  transition?: RgbwTransitionAttributes;
  temperature?: RgbwTemperatureAttributes;
  aenergy?: RgbwEnergyCounterAttributes;
  apower?: number;
  voltage?: number;
  current?: number;
  errors?: string[];
}

export interface RgbwNightModeConfig {
  enable: boolean;
  brightness: number | null;
  rgb: number[] | null;
  white: number | null;
  active_between?: string[];
}

export interface RgbwButtonPresetsConfig {
  button_doublepush: {
    brightness: number | null;
    rgb: number[] | null;
    white: number | null;
  };
}

export interface RgbwConfig {
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
  night_mode: RgbwNightModeConfig;
  button_fade_rate: number;
  button_presets: RgbwButtonPresetsConfig;
  current_limit?: number;
  power_limit?: number;
  voltage_limit?: number;
}

/**
 * The RGBW component handles an output with possibility to change color and brightness of RGBW LED load. Component has additional on/off
 * control. It has a night mode capability that can reduce brightness in a selected period of time.
 */
export class Rgbw extends ComponentWithId<RgbwAttributes, RgbwConfig> implements RgbwAttributes {
  /**
   * Source of the last command, for example, init, WS_in, http, ...
   */
  @characteristic
  readonly source: string = '';

  /**
   * True if the output channel is currently on, false otherwise.
   */
  @characteristic
  readonly output: boolean = false;

  /**
   * Current Red, Green, Blue [r,g,b] level 0..255.
   */
  @characteristic
  readonly rgb: number[] = [0, 0, 0];

  /**
   * Current brightness level (in percent).
   */
  @characteristic
  readonly brightness: number = 0;

  /**
   * Current white level 0..255.
   */
  @characteristic
  readonly white: number = 0;

  /**
   * Unix timestamp, start time of the timer (in UTC) (shown if the timer is triggered).
   */
  @characteristic
  readonly timer_started_at: number | undefined;

  /**
   * Duration of the timer in seconds (shown if the timer is triggered).
   */
  @characteristic
  readonly timer_duration: number | undefined;

  /**
   * Information about the transition (shown if transition is triggered).
   */
  @characteristic
  readonly transition?: RgbwTransitionAttributes;

  /**
   * Information about the temperature (shown if applicable).
   */
  @characteristic
  readonly temperature: RgbwTemperatureAttributes = {
      tC: null,
      tF: null,
    };

  /**
   * Information about the active energy counter (shown if applicable).
   */
  @characteristic
  readonly aenergy: RgbwEnergyCounterAttributes | undefined;

  /**
   * Last measured instantaneous active power (in Watts) delivered to the attached load (shown if applicable).
   */
  @characteristic
  readonly apower: number | undefined;

  /**
   * Last measured voltage in Volts (shown if applicable).
   */
  @characteristic
  readonly voltage: number | undefined;

  /**
   * Last measured current in Amperes (shown if applicable).
   */
  @characteristic
  readonly current: number | undefined;

  /**
   * Error conditions occurred. May contain overtemp, (shown if at least one error is present).
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Rgbw', device, id);
  }

  /**
   * Sets the output and brightness level of the light.
   * At least one of `on` and `brightness` must be specified.
   *
   * @param on - Whether to switch on or off.
   * @param brightness - Brightness level.
   * @param rgb - Red, Green, Blue [r,g,b] - each value represents level between 0..255.
   * @param white - White level 0..255.
   * @param transition_duration - Transition time in seconds - time between change from current brightness level and color to desired
   *                              brightness level and color in request.
   * @param toggle_after - Flip-back timer, in seconds.
   * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
   */
  set(
    on?: boolean,
    brightness?: number,
    rgb?: number[],
    white?: number,
    transition_duration?: number,
    toggle_after?: number,
    offset?: number,
  ): PromiseLike<null> {
    return this.rpc<null>('Set', {
      id: this.id,
      on,
      brightness,
      rgb,
      white,
      transition_duration,
      toggle_after,
      offset,
    });
  }

  /**
   * Toggles the output state.
   */
  toggle(): PromiseLike<null> {
    return this.rpc<null>('Toggle', {
      id: this.id,
    });
  }

  /**
   * This method dims up the brightness level.
   * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
   *                    If not provided, the value is defaulted to button_fade_rate.
   */
  dimUp(fade_rate?: number): PromiseLike<null> {
    return this.rpc<null>('DimUp', {
      id: this.id,
      fade_rate,
    });
  }

  /**
   * This method dims down the brightness level.
   * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
   *                    If not provided, the value is defaulted to button_fade_rate.
   */
  dimDown(fade_rate?: number): PromiseLike<null> {
    return this.rpc<null>('DimDown', {
      id: this.id,
      fade_rate,
    });
  }

  /**
   * This method stops the dimming of the brightness level.
   */
  dimStop(): PromiseLike<null> {
    return this.rpc<null>('DimStop', {
      id: this.id,
    });
  }
}
