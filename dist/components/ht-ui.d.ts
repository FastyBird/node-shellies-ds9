import { Component } from './base';
import { Device } from '../devices';
export interface HtUiAttributes {
}
export interface HtUiConfig {
    temperature_unit: 'C' | 'F';
    clock?: '12' | '24' | 'disabled';
}
/**
 * The HT_UI component handles the settings of a Plus H&T device's screen.
 */
export declare class HtUi extends Component<HtUiAttributes, HtUiConfig> implements HtUiAttributes {
    constructor(device: Device);
}
//# sourceMappingURL=ht-ui.d.ts.map