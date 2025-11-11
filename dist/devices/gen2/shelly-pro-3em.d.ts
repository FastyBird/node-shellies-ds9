import { Device } from '../base';
import { BluetoothLowEnergy, Cloud, Em, Em1, Em1Data, EmData, Mqtt, OutboundWebSocket, Script, WiFi } from '../../components';
export declare class ShellyPro3Em extends Device {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly em0: Em;
    readonly em10: Em1;
    readonly em11: Em1;
    readonly em12: Em1;
    readonly emData0: EmData;
    readonly em1Data0: Em1Data;
    readonly em1Data1: Em1Data;
    readonly em1Data2: Em1Data;
    readonly script: Script;
}
export declare class ShellyPro3Em400 extends ShellyPro3Em {
    static readonly model: string;
    static readonly modelName: string;
}
export declare class ShellyPro3Em3CT63 extends ShellyPro3Em {
    static readonly model: string;
    static readonly modelName: string;
}
//# sourceMappingURL=shelly-pro-3em.d.ts.map