import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface Pm1EnergyCounterAttributes {
  total: number;
  by_minute?: number[];
  minute_ts: number;
}

export interface Pm1Attributes {
  id: number;
  voltage?: number;
  current?: number;
  apower?: number;
  aprtpower?: number;
  pf?: number;
  freq?: number;
  aenergy?: Pm1EnergyCounterAttributes;
  ret_aenergy?: Pm1EnergyCounterAttributes;
  errors?: string[];
}

export interface Pm1Config {
  id: number;
  name: string | null;
  reverse: boolean;
}

export interface Pm1ResetCountersResponse {
  aenergy: {
    total: number;
  };
  ret_aenergy: {
    total: number;
  };
}

/**
 * The PM1 component handles electrical power metering capabilities.
 */
export class Pm1 extends ComponentWithId<Pm1Attributes, Pm1Config> implements Pm1Attributes {
  /**
   * Last measured voltage in Volts.
   */
  @characteristic
  readonly voltage: number | undefined;

  /**
   * Last measured current in Amperes.
   */
  @characteristic
  readonly current: number | undefined;

  /**
   * Last measured instantaneous active power (in Watts) delivered to the attached load.
   */
  @characteristic
  readonly apower: number | undefined;

  /**
   * Last measured instantaneous apparent power (in Volt-Amperes) delivered to the attached load (shown if applicable).
   */
  @characteristic
  readonly aprtpower: number | undefined;

  /**
   * Last measured power factor (shown if applicable).
   */
  @characteristic
  readonly pf: number | undefined;

  /**
   * Last measured network frequency (shown if applicable).
   */
  @characteristic
  readonly freq: number | undefined;

  /**
   * Information about the active energy counter.
   */
  @characteristic
  readonly aenergy: Pm1EnergyCounterAttributes | undefined;

  /**
   * Information about the returned active energy counter.
   */
  @characteristic
  readonly ret_aenergy: Pm1EnergyCounterAttributes | undefined;

  /**
   * Error conditions occurred. May contain power_meter_failure, out_of_range:voltage, out_of_range:current,
   * out_of_range:aprtpower, out_of_range:apower(shown if at least one error is present).
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Pm1', device, id);
  }

  /**
   * This method resets associated counters.
   *
   * @param type - Array of strings, selects which counter to reset.
   */
  resetCounters(type?: string[]): PromiseLike<Pm1ResetCountersResponse> {
    return this.rpc<Pm1ResetCountersResponse>('ResetCounters', {
      id: this.id,
      type,
    });
  }
}
