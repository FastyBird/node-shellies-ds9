import { component, Device } from '../base';
import {
  BluetoothLowEnergy,
  Cloud,
  Mqtt,
  OutboundWebSocket,
  PlugsUi,
  Script,
  Switch,
  WiFi,
} from '../../components';

export class ShellyPlugSGen3 extends Device {
  static readonly model: string = 'S3PL-00112EU';
  static readonly modelName: string = 'Shelly Plug S Gen3';

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
  readonly script = new Script(this);

  @component
  readonly ui = new PlugsUi(this);
}

Device.registerClass(ShellyPlugSGen3);

export class ShellyOutdoorPlugSGen3 extends ShellyPlugSGen3 {
  static readonly model: string = 'S3PL-20112EU';
  static readonly modelName: string = 'Shelly Outdoor Plug S Gen3';
}

Device.registerClass(ShellyOutdoorPlugSGen3);

export class ShellyPlugAzGen3 extends ShellyPlugSGen3 {
  static readonly model: string = 'S3PL-10112EU';
  static readonly modelName: string = 'Shelly Plug AZ Gen3';
}

Device.registerClass(ShellyPlugAzGen3);
