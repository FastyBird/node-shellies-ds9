import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface HumidityAttributes {
  id: number;
  rh: number | null;
  errors?: string[];
}

export interface HumidityConfig {
  id: number;
  name: string | null;
  report_thr: number;
  offset: number;
}

/**
 * The Humidity component handles the monitoring of the device's humidity sensors.
 */
export class Humidity extends ComponentWithId<HumidityAttributes, HumidityConfig> implements HumidityAttributes {
  /**
   * Relative humidity in % (null if a valid value could not be obtained).
   */
  @characteristic
  readonly rh: number | null = null;

  /**
   * Shown only if at least one error is present. May contain out_of_range, read when there is a problem reading sensor.
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Humidity', device, id);
  }
}
