import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface TemperatureAttributes {
  id: number;
  tC: number | null;
  tF: number | null;
  errors?: string[];
}

export interface TemperatureConfig {
  id: number;
  name: string | null;
  report_thr_C: number;
  offset_C: number;
}

/**
 * The Temperature component handles the monitoring of the device's temperature sensors.
 */
export class Temperature extends ComponentWithId<TemperatureAttributes, TemperatureConfig> implements TemperatureAttributes {
  /**
   * Temperature in Celsius (null if a valid value could not be obtained).
   */
  @characteristic
  readonly tC: number | null = null;

  /**
   * Temperature in Fahrenheit (null if a valid value could not be obtained).
   */
  @characteristic
  readonly tF: number | null = null;

  /**
   * Shown only if at least one error is present. May contain out_of_range, read when there is a problem reading sensor.
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Temperature', device, id);
  }
}
