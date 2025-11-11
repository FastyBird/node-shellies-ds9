import { component, Device } from '../base';
import {
  BluetoothLowEnergy,
  Cloud,
  Em,
  Em1,
  Em1Data,
  EmData,
  Mqtt,
  OutboundWebSocket,
  Script,
  WiFi,
} from '../../components';

export class Shelly3EmGen3 extends Device {
  static readonly model: string = 'S3EM-003CXCEU63';
  static readonly modelName: string = 'Shelly 3EM-63 G3';

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
  readonly em0 = new Em(this, 0);

  @component
  readonly em10 = new Em1(this, 0);

  @component
  readonly em11 = new Em1(this, 1);

  @component
  readonly em12 = new Em1(this, 2);

  @component
  readonly emData0 = new EmData(this, 0);

  @component
  readonly em1Data0 = new Em1Data(this, 0);

  @component
  readonly em1Data1 = new Em1Data(this, 1);

  @component
  readonly em1Data2 = new Em1Data(this, 2);

  @component
  readonly script = new Script(this);
}

Device.registerClass(Shelly3EmGen3);
