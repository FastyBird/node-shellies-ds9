import { characteristic, Component } from './base';
import { Device } from '../devices';

export interface CloudAttributes {
  connected: boolean;
}

export interface CloudConfig {
  enable: boolean;
  server: string | null;
}

/**
 * The cloud component is called Cloud. It handles cloud services of a device.
 */
export class Cloud extends Component<CloudAttributes, CloudConfig> implements CloudAttributes {
  /**
   * True if the device is connected to the Shelly cloud, false otherwise.
   */
  @characteristic
  readonly connected: boolean = false;

  constructor(device: Device) {
    super('Cloud', device);
  }
}
