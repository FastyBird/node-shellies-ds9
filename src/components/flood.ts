import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface FloodAttributes {
  id: number;
  alarm: boolean;
  mute: boolean;
  errors?: string[];
}

export interface FloodConfig {
  id: number;
  name: string | null;
  alarm_mode: 'disabled' | 'normal' | 'intense' | 'rain' | null;
  report_holdoff: number;
}

/**
 * The Flood component handles the monitoring of the device's flood sensors.
 */
export class Flood extends ComponentWithId<FloodAttributes, FloodConfig> implements FloodAttributes {
  /**
   * Alarm state
   */
  @characteristic
  readonly alarm: boolean = false;

  /**
   * Mute state
   */
  @characteristic
  readonly mute: boolean = false;

  /**
   * Error conditions occurred. May contain cable_unplugged, (shown if at least one error is present).
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('Flood', device, id);
  }
}
