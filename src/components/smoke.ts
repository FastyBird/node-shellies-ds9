import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface SmokeAttributes {
  id: number;
  alarm: boolean;
  mute: boolean;
}

export interface SmokeConfig {
  id: number;
  name: string | null;
}

/**
 * The Smoke component handles the monitoring of device's smoke sensors.
 */
export class Smoke extends ComponentWithId<SmokeAttributes, SmokeConfig> implements SmokeAttributes {
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

  constructor(device: Device, id = 0) {
    super('Smoke', device, id);
  }

  /**
   * This method mutes alarm of the associated smoke sensor.
   */
  muteAlarm(): PromiseLike<null> {
    return this.rpc<null>('Mute', {
      id: this.id,
    });
  }
}
