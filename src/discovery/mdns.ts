import os from 'os';
import mDNS from 'multicast-dns';
import { Answer, NaptrAnswer, SrvAnswer } from 'dns-packet';
import { DeviceDiscoverer } from './base';
import { DeviceId } from '../devices';

/**
 * Defines options that are passed along to the multicast-dns library.
 */
export interface MdnsOptions {
  /**
   * The network interface to use. If none is specified, all available
   * interfaces will be used.
   */
  interface?: string;
}

/**
 * Default multicast-dns options.
 */
const DEFAULT_MDNS_OPTIONS: Readonly<MdnsOptions> = {
  interface: undefined,
};

/**
 * The service name that Shelly devices use to advertise themselves.
 */
const SERVICE_NAMES = ['_shelly._tcp.local', '_http._tcp.local'];

/**
 * A service that can discover Shelly devices using mDNS.
 */
export class MdnsDeviceDiscoverer extends DeviceDiscoverer {
  /**
   * A reference to the multicast-dns library.
   */
  protected mdns: mDNS.MulticastDNS | null = null;

  /**
   * Options for the multicast-dns library.
   */
  protected mdnsOptions: MdnsOptions;

  /**
   * @param mdnsOptions - Options for the multicast-dns library.
   */
  constructor(mdnsOptions?: MdnsOptions) {
    super();

    // store the multicast-dns options, with default values
    this.mdnsOptions = { ...DEFAULT_MDNS_OPTIONS, ...(mdnsOptions || {}) };
  }

  /**
   * Makes this service start listening for new Shelly devices.
   */
  async start() {
    if (this.mdns !== null) {
      return;
    }

    this.mdns = mDNS({
      interface: this.getNetworkInterface(this.mdnsOptions.interface),
    });

    this.mdns
      .on('response', (response) => this.handleResponse(response))
      .on('error', (error) => this.emit('error', error))
      .on('warning', (error) => this.emit('error', error));

    await this.waitUntilReady();
    await this.sendQuery();
  }

  /**
   * Validates the given network interface name or address.
   * @param iface - An interface name or address.
   * @returns If a valid interface name is given, the address for that interface
   * is returned. If a valid address is given, that same address is returned.
   * @throws Throws an error if the given name or address could not be found.
   */
  protected getNetworkInterface(iface: string | undefined): string | undefined {
    if (!iface) {
      // skip if no interface has been specified
      return undefined;
    }

    // get all available interfaces
    const ifaces = os.networkInterfaces();

    // if an interface name has been given, return its address
    const ifc = ifaces[iface];
    if (ifc && ifc.length > 0) {
      // return the first address
      return ifc[0].address;
    }

    // otherwise, go through each interface and see if there is one with the
    // given address
    for (const i in ifaces) {
      const ifc = ifaces[i];
      if (!ifc) {
        continue;
      }

      for (const ii of ifc) {
        if (ii.address === iface) {
          // address found, so it's valid
          return ii.address;
        }
      }
    }

    // the given value doesn't match any available interface name or address
    throw new Error(`Invalid network interface "${iface}"`);
  }

  /**
   * Returns a promise that will resolve once the mDNS socket is ready.
   */
  protected waitUntilReady(): Promise<void> {
    return new Promise((resolve) => {
      this.mdns!.once('ready', resolve);
    });
  }

  /**
   * Queries for Shelly devices.
   */
  protected sendQuery(): Promise<void> {
    const queries = SERVICE_NAMES.map(
      (name) =>
        new Promise<void>((resolve, reject) => {
          this.mdns!.query(name, 'PTR', (error: Error | null) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        }),
    );

    return Promise.allSettled(queries).then(() => undefined);
  }

  /**
   * Makes this service stop searching for new Shelly devices.
   */
  async stop() {
    if (this.mdns === null) {
      return;
    }

    await this.destroy();

    this.mdns = null;
  }

  /**
   * Destroys the mDNS instance, closing the socket.
   */
  protected destroy(): Promise<void> {
    return new Promise((resolve) => {
      this.mdns!.destroy(resolve);
    });
  }

  /**
   * Handles mDNS response packets by parsing them and emitting `discover`
   * events.
   * @param response - The response packets.
   */
  protected handleResponse(response: mDNS.ResponsePacket) {
    const answers = response.answers ?? [];
    const additionals = response.additionals ?? [];
    const allRecords = answers.concat(additionals);

    const ptrAnswers: NaptrAnswer[] = answers.filter(
      (a) =>
        a.type === 'PTR' && SERVICE_NAMES.includes(a.name),
    ) as NaptrAnswer[];

    if (ptrAnswers.length === 0) {
      return;
    }

    const ipMap = new Map<string, string>();

    for (const a of allRecords) {
      if ((a.type === 'A' || a.type === 'AAAA') && typeof a.name === 'string' && typeof a.data === 'string') {
        if (!ipMap.has(a.name)) {
          ipMap.set(a.name, a.data);
        }
      }
    }

    for (const ptr of ptrAnswers) {
      const instanceName = String(ptr.data);
      const [fullId] = instanceName.split('.', 1);
      const deviceId = fullId as DeviceId;

      // TXT data pro konkrétní instanci
      const txt = this.parseTxtData(allRecords, instanceName);
      const gen = txt.get('gen');

      if (!gen) {
        continue;
      }

      const srv: SrvAnswer | undefined = allRecords.find((a) => a.type === 'SRV' && a.name === instanceName) as SrvAnswer | undefined;

      let ipAddress: string | undefined;

      if (srv && typeof srv.data === 'object' && srv.data && 'target' in (srv.data)) {
        const target = (srv.data).target as string;
        ipAddress = ipMap.get(target);
      }

      if (!ipAddress) {
        ipAddress = Array.from(ipMap.values())[0];
      }

      if (ipAddress) {
        this.handleDiscoveredDevice({
          deviceId,
          hostname: ipAddress,
        });
      }
    }
  }

  private parseTxtData(records: Answer[], name: string): Map<string, string> {
    const data = new Map<string, string>();

    for (const a of records) {
      if (a.type !== 'TXT') {
        continue;
      }

      if (a.name === name && Array.isArray(a.data)) {
        for (const entry of a.data) {
          const text = typeof entry === 'string' ? entry : String(entry);
          const [key, value] = text.split('=', 2);

          if (key) {
            data.set(key, value ?? '');
          }
        }
      }
    }

    return data;
  }
}
