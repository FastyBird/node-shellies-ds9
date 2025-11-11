import { component, Device } from '../base';
import {
  BluetoothLowEnergy,
  Cloud,
  Em1,
  Em1Data,
  Mqtt,
  OutboundWebSocket,
  Script,
  Switch,
  WiFi,
} from '../../components';

export class ShellyEmGen3 extends Device {
  static readonly model: string = 'S3EM-002CXCEU';
  static readonly modelName: string = 'Shelly EM Gen3';

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
  readonly em10 = new Em1(this, 0);

  @component
  readonly em11 = new Em1(this, 1);

  @component
  readonly em1Data0 = new Em1Data(this, 0);

  @component
  readonly em1Data1 = new Em1Data(this, 1);

  @component
  readonly script = new Script(this);
}

Device.registerClass(ShellyEmGen3);
