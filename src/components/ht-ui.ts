import { Component } from './base';
import { Device } from '../devices';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HtUiAttributes {}

export interface HtUiConfig {
  temperature_unit: 'C' | 'F';
  clock?: '12' | '24' | 'disabled';
}

/**
 * The HT_UI component handles the settings of a Plus H&T device's screen.
 */
export class HtUi extends Component<HtUiAttributes, HtUiConfig> implements HtUiAttributes {
  constructor(device: Device) {
    super('HT_UI', device);
  }
}
