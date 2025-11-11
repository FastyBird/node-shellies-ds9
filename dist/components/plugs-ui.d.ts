import { Component } from './base';
import { Device } from '../devices';
export interface PlugsUiAttributes {
}
export interface PlugsUiConfig {
    leds: {
        mode: 'power' | 'switch' | 'off';
        colors: {
            'switch:0': {
                on: {
                    rgb: number[];
                    brightness: number;
                };
                off: {
                    rgb: number[];
                    brightness: number;
                };
            };
            power: {
                brightness: number;
            };
        };
        night_mode: {
            enable: boolean;
            brightness: number;
            active_between: string[];
        };
    };
    controls: {
        'switch:0': {
            in_mode: 'momentary' | 'detached';
        };
    };
}
/**
 * The Plugs_Ui component handles the settings of a Plus Plug device's screen.
 */
export declare class PlugsUi extends Component<PlugsUiAttributes, PlugsUiConfig> implements PlugsUiAttributes {
    constructor(device: Device);
}
//# sourceMappingURL=plugs-ui.d.ts.map