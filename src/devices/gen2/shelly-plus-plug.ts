import { component, Device } from '../base';
import {
  BluetoothLowEnergy,
  Cloud,
  Mqtt,
  OutboundWebSocket,
  Script,
  Switch,
  PlugsUi,
  WiFi,
} from '../../components';

export class ShellyPlusPlugS extends Device {
  static readonly model: string = 'SNPL-00112EU';
  static readonly modelName: string = 'Shelly Plus Plug S';

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

Device.registerClass(ShellyPlusPlugS);

export class ShellyPlusPlugUs extends ShellyPlusPlugS {
  static readonly model: string = 'SNPL-00116US';
  static readonly modelName: string = 'Shelly Plus Plug US';
}

Device.registerClass(ShellyPlusPlugUs);

export class ShellyPlusPlugUk extends ShellyPlusPlugS {
  static readonly model: string = 'SNPL-00112UK';
  static readonly modelName: string = 'Shelly Plus Plug UK';
}

Device.registerClass(ShellyPlusPlugUk);

export class ShellyPlusPlugIt extends ShellyPlusPlugS {
  static readonly model: string = 'SNPL-00110IT';
  static readonly modelName: string = 'Shelly Plus Plug IT';
}

Device.registerClass(ShellyPlusPlugIt);
