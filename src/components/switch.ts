import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface SwitchEnergyCounterAttributes {
  total: number;
  by_minute: number[];
  minute_ts: number;
}

export interface SwitchRetEnergyCounterAttributes {
  total: number;
  by_minute: number[];
  minute_ts: number;
}

export interface SwitchTemperatureAttributes {
  tC: number | null;
  tF: number | null;
}

export interface SwitchAttributes {
  id: number;
  source: string;
  output: boolean;
  timer_started_at?: number;
  timer_duration?: number;
  apower?: number;
  voltage?: number;
  current?: number;
  pf?: number;
  freq?: number;
  aenergy?: SwitchEnergyCounterAttributes;
  ret_aenergy?: SwitchRetEnergyCounterAttributes;
  temperature: SwitchTemperatureAttributes;
  errors?: string[];
}

export interface SwitchConfig {
  id: number;
  name: string | null;
  in_mode: 'momentary' | 'follow' | 'flip' | 'detached' | 'cycle' | 'activate';
  in_locked: boolean;
  initial_state: 'off' | 'on' | 'restore_last' | 'match_input';
  auto_on: boolean;
  auto_on_delay: number;
  auto_off: boolean;
  auto_off_delay: number;
  autorecover_voltage_errors: boolean;
  input_id: number;
  power_limit?: number | null;
  voltage_limit?: number | null;
  undervoltage_limit?: number | null;
  current_limit?: number | null;
  reverse?: boolean;
}

export interface SwitchSetResponse {
  was_on: boolean;
}

export interface SwitchToggleResponse {
  was_on: boolean;
}

export interface SwitchResetCountersResponse {
  aenergy: {
    total: number;
  };
  ret_aenergy: {
    total: number;
  };
}

/**
 * The Switch component handles a switch (relay) output terminal with optional power metering capabilities.
 */
export class Switch extends ComponentWithId<SwitchAttributes, SwitchConfig> implements SwitchAttributes {
  /**
   * Source of the last command, for example, init, WS_in, http, ...
   */
  @characteristic
  readonly source: string = '';

  /**
   * true if the output channel is currently on, false otherwise.
   */
  @characteristic
  readonly output: boolean = false;

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
   * Last measured power factor (shown if applicable).
   */
  @characteristic
  readonly pf: number | undefined;

  /**
   * Last measured network frequency in Hz (shown if applicable).
   */
  @characteristic
  readonly freq: number | undefined;

  /**
   * Information about the active energy counter (shown if applicable).
   */
  @characteristic
  readonly aenergy: SwitchEnergyCounterAttributes | undefined;

  /**
   * Information about the returned active energy counter * (shown if applicable).
   */
  @characteristic
  readonly ret_aenergy: SwitchRetEnergyCounterAttributes | undefined;

  /**
   * Information about the temperature (shown if applicable).
   */
  @characteristic
  readonly temperature: SwitchTemperatureAttributes = {
      tC: null,
      tF: null,
    };

  /**
   * Error conditions occurred. May contain overtemp, overpower, overvoltage, undervoltage, (shown if at least one error is present).
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Switch', device, id);
  }

  /**
   * Sets the output of the switch.
   *
   * @param on - Whether to switch on or off.
   * @param toggle_after - Flip-back timer, in seconds.
   */
  set(on: boolean, toggle_after?: number): PromiseLike<SwitchSetResponse> {
    return this.rpc<SwitchSetResponse>('Set', {
      id: this.id,
      on,
      toggle_after,
    });
  }

  /**
   * Toggles the switch.
   */
  toggle(): PromiseLike<SwitchToggleResponse> {
    return this.rpc<SwitchToggleResponse>('Toggle', {
      id: this.id,
    });
  }

  /**
   * This method resets associated counters.
   *
   * @param type - Array of strings, selects which counter to reset.
   */
  resetCounters(type?: string[]): PromiseLike<SwitchResetCountersResponse> {
    return this.rpc<SwitchResetCountersResponse>('ResetCounters', {
      id: this.id,
      type,
    });
  }
}
