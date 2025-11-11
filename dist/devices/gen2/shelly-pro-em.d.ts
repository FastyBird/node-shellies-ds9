import { Device } from '../base';
import { BluetoothLowEnergy, Cloud, Em1, Em1Data, Mqtt, OutboundWebSocket, Script, Switch, WiFi } from '../../components';
export declare class ShellyProEm extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly switch0: Switch;
    readonly em10: Em1;
    readonly em11: Em1;
    readonly em1Data0: Em1Data;
    readonly em1Data1: Em1Data;
    readonly script: Script;
}
//# sourceMappingURL=shelly-pro-em.d.ts.map