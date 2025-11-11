import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';

export interface DevicePowerBatteryStatus {
  V: number | null;
  percent: number | null;
}

export interface DevicePowerExternalSource {
  present: boolean;
}

export interface DevicePowerAttributes {
  id: number;
  battery: DevicePowerBatteryStatus;
  external?: DevicePowerExternalSource;
  errors?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DevicePowerConfig {}

/**
 * The DevicePower component handles the monitoring of a device's battery charge and is only available on battery-operated devices.
 */
export class DevicePower extends ComponentWithId<DevicePowerAttributes, DevicePowerConfig> implements DevicePowerAttributes {
  /**
   * Information about the battery charge.
   */
  @characteristic
  readonly battery: DevicePowerBatteryStatus = {
      V: null,
      percent: null,
    };

  /**
   * Information about the external power source (only available if an external power source is supported).
   */
  @characteristic
  readonly external: DevicePowerExternalSource | undefined;

  /**
   * Whether an external power source is connected.
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('DevicePower', device, id);
  }
}
