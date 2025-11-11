import { component, Device, MultiProfileDevice } from '../base';
import {
  BluetoothLowEnergy,
  Cloud,
  Mqtt,
  OutboundWebSocket,
  PowerStripUi,
  Script,
  Switch,
  WiFi,
} from '../../components';

export class ShellyPowerStripGen4 extends MultiProfileDevice {
  static readonly model: string = 'S4PL-00416EU';
  static readonly modelName: string = 'Shelly Power Strip Gen4';

  @component
  readonly wifi = new WiFi(this);

  @component
  readonly bluetoothLowEnergy = new BluetoothLowEnergy(this);

  @component
  readonly cloud = new Cloud(this);

  @component
  readonly mqtt = new Mqtt(this);

  @component
  readonly outboundWebSocket = new OutboundWebSocket(this);

  @component
  readonly switch0 = new Switch(this, 0);

  @component
  readonly switch1 = new Switch(this, 1);

  @component
  readonly switch2 = new Switch(this, 2);

  @component
  readonly switch3 = new Switch(this, 3);

  @component
  readonly script = new Script(this);

  @component
  readonly ui = new PowerStripUi(this);
}

Device.registerClass(ShellyPowerStripGen4);
