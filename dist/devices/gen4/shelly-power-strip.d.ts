import { MultiProfileDevice } from '../base';
import { BluetoothLowEnergy, Cloud, Mqtt, OutboundWebSocket, PowerStripUi, Script, Switch, WiFi } from '../../components';
export declare class ShellyPowerStripGen4 extends MultiProfileDevice {
    static readonly model: string;
    static readonly modelName: string;
    readonly wifi: WiFi;
    readonly bluetoothLowEnergy: BluetoothLowEnergy;
    readonly cloud: Cloud;
    readonly mqtt: Mqtt;
    readonly outboundWebSocket: OutboundWebSocket;
    readonly switch0: Switch;
    readonly switch1: Switch;
    readonly switch2: Switch;
    readonly switch3: Switch;
    readonly script: Script;
    readonly ui: PowerStripUi;
}
//# sourceMappingURL=shelly-power-strip.d.ts.map