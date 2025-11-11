import { Component } from './base';
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
export declare class Cloud extends Component<CloudAttributes, CloudConfig> implements CloudAttributes {
    /**
     * True if the device is connected to the Shelly cloud, false otherwise.
     */
    readonly connected: boolean;
    constructor(device: Device);
}
//# sourceMappingURL=cloud.d.ts.map