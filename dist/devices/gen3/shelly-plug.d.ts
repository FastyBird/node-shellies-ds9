import { Device } from '../base';
import { BluetoothLowEnergy, Cloud, Mqtt, OutboundWebSocket, PlugsUi, Script, Switch, WiFi } from '../../components';
export declare class ShellyPlugSGen3 extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly switch0: Switch;
    readonly script: Script;
    readonly ui: PlugsUi;
}
export declare class ShellyOutdoorPlugSGen3 extends ShellyPlugSGen3 {
    static readonly model: string;
    static readonly modelName: string;
}
export declare class ShellyPlugAzGen3 extends ShellyPlugSGen3 {
    static readonly model: string;
    static readonly modelName: string;
}
//# sourceMappingURL=shelly-plug.d.ts.map