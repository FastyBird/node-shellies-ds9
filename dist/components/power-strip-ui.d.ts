import { Component } from './base';
import { Device } from '../devices';
export interface PowerStripUiAttributes {
}
export interface PowerStripUiConfig {
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
        'switch:1': {
            in_mode: 'momentary' | 'detached';
        };
        'switch:2': {
            in_mode: 'momentary' | 'detached';
        };
        'switch:3': {
            in_mode: 'momentary' | 'detached';
        };
    };
}
/**
 * The Plugs_Ui component handles the settings of a Plus Plug device's screen.
 */
export declare class PowerStripUi extends Component<PowerStripUiAttributes, PowerStripUiConfig> implements PowerStripUiAttributes {
    constructor(device: Device);
}
//# sourceMappingURL=power-strip-ui.d.ts.map