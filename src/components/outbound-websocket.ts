import { characteristic, Component } from './base';
import { Device } from '../devices';

export interface OutboundWebSocketAttributes {
  connected: boolean;
}

export interface OutboundWebSocketConfig {
  enable: boolean;
  server: string;
  ssl_ca: '*' | 'user_ca.pem' | 'ca.pem' | null;
}

/**
 * The Outbound Websocket component makes it possible to configure a Gen2+ Shelly device to establish and maintain an outbound
 * websocket connection.
 */
export class OutboundWebSocket extends Component<
  OutboundWebSocketAttributes, OutboundWebSocketConfig> implements OutboundWebSocketAttributes {
  /**
   * True if a device is connected to a websocket outbound connection or false otherwise.
   */
  @characteristic
  readonly connected: boolean = false;

  constructor(device: Device) {
    super('Ws', device);
  }
}
