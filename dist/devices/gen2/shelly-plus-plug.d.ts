import { Device } from '../base';
import { BluetoothLowEnergy, Cloud, Mqtt, OutboundWebSocket, Script, Switch, PlugsUi, WiFi } from '../../components';
export declare class ShellyPlusPlugS extends Device {
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
export declare class ShellyPlusPlugUs extends ShellyPlusPlugS {
    static readonly model: string;
    static readonly modelName: string;
}
export declare class ShellyPlusPlugUk extends ShellyPlusPlugS {
    static readonly model: string;
    static readonly modelName: string;
}
export declare class ShellyPlusPlugIt extends ShellyPlusPlugS {
    static readonly model: string;
    static readonly modelName: string;
}
//# sourceMappingURL=shelly-plus-plug.d.ts.map