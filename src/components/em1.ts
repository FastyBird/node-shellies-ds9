import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface Em1Attributes {
  id: number;
  current: number | null;
  voltage: number | null;
  act_power: number | null;
  aprt_power?: number | null;
  pf?: number | null;
  freq?: number | null;
  calibration: string;
  errors?: string[];
  flags?: string[];
}

export interface Em1Config {
  id: number;
  name: string | null;
  reverse: boolean;
  ct_type: string;
}

export interface Em1GetCTTypeResponse {
    supported: string[];
}

export interface Em1CalibrateFromResponse {
    restart_required: boolean;
}

export interface Em1RevertToFactoryCalibrationResponse {
    restart_required: boolean;
}

/**
 * EM1 component handles the data collection and processing from energy meter devices like the ShellyProEM.
 */
export class Em1 extends ComponentWithId<Em1Attributes, Em1Config> implements Em1Attributes {
  /**
   * Current measurement value, [A].
   */
  @characteristic
  readonly current: number | null = null;

  /**
   * Voltage measurement value, [V].
   */
  @characteristic
  readonly voltage: number | null = null;

  /**
   * Active power measurement value, [W].
   */
  @characteristic
  readonly act_power: number | null = null;

  /**
   * Apparent power measurement value, [VA] (if applicable).
   */
  @characteristic
  readonly aprt_power: number | null | undefined;

  /**
   * Power factor measurement value (if applicable).
   */
  @characteristic
  readonly pf: number | null | undefined;

  /**
   * Network frequency measurement value (if applicable).
   */
  @characteristic
  readonly freq: number | null | undefined;

  /**
   * Indicates factory calibration or which EM1:id is the source for calibration.
   */
  @characteristic
  readonly calibration: string = '';

  /**
   * EM1 component error conditions. May contain power_meter_failure, out_of_range: act_power, out_of_range: aprt_power,
   * out_of_range:voltage, out_of_range:current or ct_type_not_set. Present in status only if not empty.
   */
  @characteristic
  readonly errors: string[] | undefined;

  /**
   * Communicates present conditions, shown if at least one flag is set. Depending on component capabilites may contain: count_disabled
   */
  @characteristic
  readonly flags: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Em1', device, id);
  }

  /**
   * This method calibrates (aligns the measurements of) an instance of an EM1 component to another EM1 component (if applicable).
   *
   * @param other_id - ID of the EM1 component from witch the calibration data is taken.
   */
  calibrateFrom(other_id: number): PromiseLike<Em1CalibrateFromResponse> {
    return this.rpc<Em1CalibrateFromResponse>('CalibrateFrom', {
      id: this.id,
      other_id,
    });
  }

  /**
   * This method resets a user-calibrated EM1 component to its factory defaults (if applicable).
   */
  revertToFactoryCalibration(): PromiseLike<Em1RevertToFactoryCalibrationResponse> {
    return this.rpc<Em1RevertToFactoryCalibrationResponse>('RevertToFactoryCalibration', {
      id: this.id,
    });
  }

  /**
   * This method gets supported CT types.
   */
  getCTTypes(): PromiseLike<Em1GetCTTypeResponse> {
    return this.rpc<Em1GetCTTypeResponse>('GetCTTypes', {
      id: this.id,
    });
  }
}
