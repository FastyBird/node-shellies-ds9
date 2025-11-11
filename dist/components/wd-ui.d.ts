import { Component } from './base';
import { Device } from '../devices';
export interface WdUiAttributes {
}
export interface WdUiConfig {
    sys_led_enable: boolean;
    power_led: 'on' | 'off' | 'match_output' | 'inverted_output';
}
/**
 * The WD_Ui component handles the settings of a Plus H&T device's screen.
 */
export declare class WdUi extends Component<WdUiAttributes, WdUiConfig> implements WdUiAttributes {
    constructor(device: Device);
}
//# sourceMappingURL=wd-ui.d.ts.map