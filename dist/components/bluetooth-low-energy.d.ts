import { Component } from './base';
import { Device } from '../devices';
export interface BluetoothLowEnergyBlutrvAssocAttributes {
    duration: number;
    started_at: number;
}
export interface BluetoothLowEnergyAttributes {
    blutrv_assoc?: BluetoothLowEnergyBlutrvAssocAttributes;
}
export interface BluetoothLowEnergyRpcConfig {
    enable: boolean;
}
export interface BluetoothLowEnergyConfig {
    enable: boolean;
    rpc: BluetoothLowEnergyRpcConfig;
}
export interface BluetoothLowEnergyErrorResponse {
    code: number;
    message: string;
}
/**
 * The Bluetooth Low Energy component is called BLE. It handles bluetooth services of a device.
 */
export declare class BluetoothLowEnergy extends Component<BluetoothLowEnergyAttributes, BluetoothLowEnergyConfig> implements BluetoothLowEnergyAttributes {
    /**
     * BluTrvAssociations information, present only when associations are active.
     */
    readonly blutrv_assoc?: BluetoothLowEnergyBlutrvAssocAttributes;
    constructor(device: Device);
    /**
     * Associate a BLUTRV device with the gateway or associate an already associated BLUTRV device with BTHome temperature
     * and/or window sensors (BLUHT, BLUDW) which can either be existing or will be added.
     *
     * @param blutrv_id - If not specified discover and associate new BLUTRV device with the gateway or ID of the BluTrv component
     *                    instance to perform sensor associations (a device doesn't need to be in pairing mode in this case)
     * @param duration - Max discovery duration, seconds. Defaults to 30 if not provided.
     * @param rssi_thr - Defaults to -80 if not provided.
     */
    startBluTrvAssociations(blutrv_id?: number, duration?: number, rssi_thr?: number): PromiseLike<BluetoothLowEnergyErrorResponse | null>;
}
//# sourceMappingURL=bluetooth-low-energy.d.ts.map