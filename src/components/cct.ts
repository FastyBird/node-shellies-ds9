import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface CctTransitionAttributes {
  target: {
    output: boolean;
    brightness: number;
    ct: number;
  };
  started_at: number;
  duration: number;
}

export interface CctTemperatureAttributes {
  tC: number | null;
  tF: number | null;
}

export interface CctAttributes {
  id: number;
  source: string;
  output: boolean;
  brightness: number;
  ct: number;
  timer_started_at?: number;
  timer_duration?: number;
  transition?: CctTransitionAttributes;
  temperature?: CctTemperatureAttributes;
  apower?: number;
  voltage?: number;
  current?: number;
  errors?: string[];
}

export interface CctNightModeConfig {
  enable: boolean;
  brightness: number | null;
  ct: number | null;
  active_between?: string[];
}

export interface CctButtonPresetsConfig {
  button_doublepush: {
    brightness: number | null;
    ct: number[] | null;
  };
}

export interface CctConfig {
  id: number;
  name: string | null;
  initial_state: 'off' | 'on' | 'restore_last';
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
  transition_duration: number;
  min_brightness_on_toggle: number;
  night_mode: CctNightModeConfig;
  button_fade_rate: number;
  button_presets: CctButtonPresetsConfig;
  range_map: number[] | null;
  ct_range: number[] | null;
  current_limit?: number;
  power_limit?: number;
  voltage_limit?: number;
}

/**
 * The CCT component handles a dimmable light output with adjustable hues of white (cold/warm) and on/off control.
 * It has a night mode capability that can reduce brightness and color temperature in a selected period of time.
 */
export class Cct extends ComponentWithId<CctAttributes, CctConfig> implements CctAttributes {
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
   * Current brightness level (in percent).
   */
  @characteristic
  readonly brightness: number = 0;

  /**
   * Current color temperature level (in Kelvin)
   */
  @characteristic
  readonly ct: number = 0;

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
  readonly transition?: CctTransitionAttributes;

  /**
   * Information about the temperature (if applicable).
   */
  @characteristic
  readonly temperature: CctTemperatureAttributes = {
      tC: null,
      tF: null,
    };

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
    super('Cct', device, id);
  }

  /**
   * This method sets the output, brightness and color temperature level of the CCT component.
   *
   * @param on - Whether to switch on or off.
   * @param brightness - Brightness level.
   * @param ct - Color temperature level (in Kelvin).
   * @param transition_duration - Transition time in seconds - time between change from current brightness level to desired brightness
   *                              level and current color temperature level to desired color temperature level in request Optional
   * @param toggle_after - Flip-back timer, in seconds.
   * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
   */
  set(
    on?: boolean,
    brightness?: number,
    ct?: number,
    transition_duration?: number,
    toggle_after?: number,
    offset?: number,
  ): PromiseLike<null> {
    return this.rpc<null>('Set', {
      id: this.id,
      on,
      brightness,
      ct,
      transition_duration,
      toggle_after,
      offset,
    });
  }

  /**
   * This method toggles the output state.
   */
  toggle(): PromiseLike<null> {
    return this.rpc<null>('Toggle', {
      id: this.id,
    });
  }

  /**
   * This method dims up the brightness level.
   *
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
   *
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
