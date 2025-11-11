import { component, Device } from '../base';
import {
  BluetoothLowEnergy,
  Cloud,
  Input,
  Mqtt,
  OutboundWebSocket,
  Script,
  Light,
  WiFi,
} from '../../components';

export class ShellyPlusDimmer extends Device {
  static readonly model: string = 'SNDM-00100WW';
  static readonly modelName: string = 'Shelly Plus 0-10V Dimmer';

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
  readonly input0 = new Input(this, 0);

  @component
  readonly input1 = new Input(this, 1);

  @component
  readonly light0 = new Light(this, 0);

  @component
  readonly script = new Script(this);
}

Device.registerClass(ShellyPlusDimmer);
