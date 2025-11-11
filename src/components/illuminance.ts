import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface IlluminanceAttributes {
  id: number;
  lux: number | null;
  illumination: string | null;
  errors?: string[];
}

export interface IlluminanceConfig {
  id: number;
  name: string | null;
  dark_thr: number;
  bright_thr: number;
}

/**
 * The Illuminance component handles the monitoring of the device's illuminance sensors.
 */
export class Illuminance extends ComponentWithId<IlluminanceAttributes, IlluminanceConfig> implements IlluminanceAttributes {
  /**
   * Illuminance in lux (null if a valid value could not be obtained) (if applicable).
   */
  @characteristic
  readonly lux: number | null = null;

  /**
   * Illuminance level interpreted according to dark_thr/bright_thr (null if valid value could not be obtained):
   * lux below dark_thr is interpreted as dark, lux between dark_thr and bright_thr is interpreted as twilight,
   * lux above bright_thr is interpreted as bright.
   */
  @characteristic
  readonly illumination: string | null = null;

  /**
   * Shown only if at least one error is present. May contain out_of_range, read when there is a problem reading sensor.
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Illuminance', device, id);
  }
}
