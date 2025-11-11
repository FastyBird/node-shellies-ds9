import { characteristic, Component } from './base';
import { Device } from '../devices';

export interface EthernetAttributes {
  ip: string | null;
}

export interface EthernetConfig {
  enable: boolean;
  server_mode: boolean;
  ipv4mode: 'dhcp' | 'static';
  ip: string | null;
  netmask: string | null;
  gw: string | null;
  nameserver: string | null;
  dhcp_start: string;
  dhcp_end: string;
}

/**
 * The Ethernet component handles the ethernet interface of devices and uses Eth for RPC method namespace.
 */
export class Ethernet extends Component<EthernetAttributes, EthernetConfig> implements EthernetAttributes {
  /**
   * IP of the device in the network.
   */
  @characteristic
  readonly ip: string | null = null;

  constructor(device: Device) {
    super('Eth', device);
  }
}
