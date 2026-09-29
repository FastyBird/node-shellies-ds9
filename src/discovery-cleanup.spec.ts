import { AddressInfo } from 'net';
import { WebSocketServer } from 'ws';

import { DeviceIdentifiers } from './discovery';
import { RpcHandler } from './rpc';
import { Shellies } from './shellies';

class DiscoverableShellies extends Shellies {
  discover(identifiers: DeviceIdentifiers) {
    return this.handleDiscoveredDevice(identifiers);
  }
}

const identifiers = { deviceId: 'shellypro4pm-test', hostname: '127.0.0.1' };
const info = { id: identifiers.deviceId, mac: 'test', model: 'SPSW-004PE16EU' };

async function withDeadline(promise: Promise<void>): Promise<void> {
  let timer!: ReturnType<typeof setTimeout>;
  try {
    await Promise.race([
      promise,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error('Socket lifecycle event timed out')), 1000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

describe('discovery RPC ownership', () => {
  test.each(['Shelly.GetDeviceInfo', 'Shelly.GetStatus', 'Shelly.GetConfig'])(
    'destroys the handler when %s fails and allows rediscovery',
    async (failedMethod) => {
      const shellies = new DiscoverableShellies({ autoLoadStatus: true, autoLoadConfig: true });
      const error = jest.fn();
      shellies.on('error', error);
      const handler = {
        request: jest.fn((method) => method === failedMethod
          ? Promise.reject(new Error('network unavailable'))
          : Promise.resolve(method === 'Shelly.GetDeviceInfo' ? info : {})),
        on: jest.fn().mockReturnThis(),
        destroy: jest.fn().mockResolvedValue(undefined),
      };
      jest.spyOn(shellies.websocket, 'create').mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);

      await shellies.discover(identifiers);
      await shellies.discover(identifiers);

      expect(error).toHaveBeenCalledTimes(2);
      expect(handler.destroy).toHaveBeenCalledTimes(2);
      expect(shellies.size).toBe(0);
    },
  );

  test('releases the originally discovered name after canonical ID resolution fails', async () => {
    const shellies = new DiscoverableShellies();
    const handler = {
      request: jest.fn((method) => method === 'Shelly.GetDeviceInfo'
        ? Promise.resolve({ ...info, name: 'Kitchen' })
        : Promise.reject(new Error('status failed'))),
      on: jest.fn().mockReturnThis(),
      destroy: jest.fn().mockResolvedValue(undefined),
    };
    const create = jest.spyOn(shellies.websocket, 'create')
      .mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);

    await shellies.discover({ ...identifiers, deviceId: 'Kitchen' });
    await shellies.discover({ ...identifiers, deviceId: 'Kitchen' });

    expect(create).toHaveBeenCalledTimes(2);
    expect(handler.destroy).toHaveBeenCalledTimes(2);
  });

  test.each([
    { ...info, id: 'unexpected-device' },
    { ...info, model: 'unsupported-model' },
  ])('closes a rejected or unknown device handler', async (response) => {
    const shellies = new DiscoverableShellies();
    const handler = { request: jest.fn().mockResolvedValue(response), destroy: jest.fn().mockResolvedValue(undefined) };
    jest.spyOn(shellies.websocket, 'create').mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);

    await shellies.discover(identifiers);

    expect(handler.destroy).toHaveBeenCalledTimes(1);
    expect(shellies.size).toBe(0);
  });

  test('retains an adopted handler even if an add listener throws', async () => {
    const shellies = new DiscoverableShellies({ autoLoadStatus: false });
    const handler = {
      request: jest.fn().mockResolvedValue(info),
      on: jest.fn().mockReturnThis(),
      destroy: jest.fn().mockResolvedValue(undefined),
    };
    jest.spyOn(shellies.websocket, 'create').mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);
    shellies.on('add', () => {
      throw new Error('consumer failed');
    });

    await shellies.discover(identifiers);

    expect(shellies.get(info.id)?.rpcHandler).toBe(handler);
    expect(handler.destroy).not.toHaveBeenCalled();
  });

  test('keeps discovery pending until the failed handler finishes closing', async () => {
    const shellies = new DiscoverableShellies();
    let finishClosing!: () => void;
    let closingStarted!: () => void;
    const closing = new Promise<void>((resolve) => {
      closingStarted = resolve;
    });
    const handler = {
      request: jest.fn().mockRejectedValue(new Error('network unavailable')),
      destroy: jest.fn(() => {
        closingStarted();
        return new Promise<void>((resolve) => {
          finishClosing = resolve;
        });
      }),
    };
    const create = jest.spyOn(shellies.websocket, 'create')
      .mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);

    const first = shellies.discover(identifiers);
    await closing;
    await shellies.discover(identifiers);
    expect(create).toHaveBeenCalledTimes(1);
    finishClosing();
    await first;

    handler.destroy.mockResolvedValue(undefined);
    await shellies.discover(identifiers);
    expect(create).toHaveBeenCalledTimes(2);
  });

  test('reports cleanup failure without losing the discovery error or blocking a retry', async () => {
    const shellies = new DiscoverableShellies();
    const errors: string[] = [];
    shellies.on('error', (_id, error) => errors.push(error.message));
    const handler = {
      request: jest.fn().mockRejectedValue(new Error('network unavailable')),
      destroy: jest.fn().mockRejectedValue(new Error('close failed')),
    };
    const create = jest.spyOn(shellies.websocket, 'create')
      .mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);

    await shellies.discover(identifiers);
    expect(errors).toEqual([
      `Failed to add discovered device (id: ${identifiers.deviceId}): network unavailable`,
      `Failed to close discovery connection (id: ${identifiers.deviceId}): close failed`,
    ]);
    await shellies.discover(identifiers);
    expect(create).toHaveBeenCalledTimes(2);
  });

  test('keeps an adopted handler alive when the discovered ID has different casing', async () => {
    const shellies = new DiscoverableShellies({ autoLoadStatus: false });
    const handler = {
      request: jest.fn().mockResolvedValue(info),
      on: jest.fn().mockReturnThis(),
      destroy: jest.fn().mockResolvedValue(undefined),
    };
    jest.spyOn(shellies.websocket, 'create').mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);

    await shellies.discover({ ...identifiers, deviceId: identifiers.deviceId.toUpperCase() });

    expect(shellies.get(info.id)?.rpcHandler).toBe(handler);
    expect(handler.destroy).not.toHaveBeenCalled();
  });

  test.each(['Shelly.GetDeviceInfo', 'Shelly.GetStatus', 'Shelly.GetConfig'])(
    'does not adopt a discovery that was awaiting %s when clear ran', async (pendingMethod) => {
      const shellies = new DiscoverableShellies({ autoLoadStatus: true, autoLoadConfig: true });
      let finish!: (value: unknown) => void;
      let started!: () => void;
      const loading = new Promise<void>((resolve) => {
        started = resolve;
      });
      const handler = {
        request: jest.fn((method) => {
          if (method === pendingMethod) {
            started();
            return new Promise((resolve) => {
              finish = resolve;
            });
          }
          return Promise.resolve(method === 'Shelly.GetDeviceInfo' ? info : {});
        }),
        on: jest.fn().mockReturnThis(),
        destroy: jest.fn().mockResolvedValue(undefined),
      };
      jest.spyOn(shellies.websocket, 'create').mockReturnValue(handler as unknown as ReturnType<typeof shellies.websocket.create>);
      const added = jest.fn();
      shellies.on('add', added);
      const discovery = shellies.discover(identifiers);
      await loading;
      shellies.clear();
      finish(pendingMethod === 'Shelly.GetDeviceInfo' ? info : {});
      await discovery;

      expect(added).not.toHaveBeenCalled();
      expect(shellies.size).toBe(0);
      expect(handler.destroy).toHaveBeenCalledTimes(1);
    },
  );

  test('canonical replacement closes the previous real socket and clear closes the replacement', async () => {
    const server = new WebSocketServer({ host: '127.0.0.1', port: 0 });
    await new Promise<void>((resolve) => server.once('listening', resolve));
    server.on('connection', (socket) => socket.on('message', (raw) => {
      const request = JSON.parse(raw.toString()) as { id: number };
      socket.send(JSON.stringify({ id: request.id, result: { ...info, name: 'Kitchen' } }));
    }));
    const shellies = new DiscoverableShellies({
      autoLoadStatus: false,
      websocket: { clientId: 'canonical-cleanup-test', pingInterval: 0, reconnectInterval: 0.02, requestTimeout: 1 },
    });
    const handlers: RpcHandler[] = [];
    const create = shellies.websocket.create.bind(shellies.websocket);
    jest.spyOn(shellies.websocket, 'create').mockImplementation((...args) => {
      const handler = create(...args);
      handlers.push(handler);
      return handler;
    });
    const target = { ...identifiers, hostname: `127.0.0.1:${(server.address() as AddressInfo).port}` };

    try {
      await shellies.discover(target);
      const first = shellies.get(info.id)!;
      const oldClosed = new Promise<void>((resolve) => handlers[0].once('disconnect', () => resolve()));
      await shellies.discover({ ...target, deviceId: 'Kitchen' });
      expect(shellies.get(info.id)).not.toBe(first);
      // Wait for a close event, bounded so the regression fails without leaking sockets.
      await withDeadline(oldClosed);
      expect(handlers[0].connected).toBe(false);
      expect(handlers[1].connected).toBe(true);

      // Network recovery must still work for the active replacement.
      const reconnected = new Promise<void>((resolve) => handlers[1].once('connect', resolve));
      for (const socket of server.clients) {
        socket.terminate();
      }
      await withDeadline(reconnected);
      expect(handlers[1].connected).toBe(true);
      expect(handlers[0].connected).toBe(false);

      const newClosed = new Promise<void>((resolve) => handlers[1].once('disconnect', () => resolve()));
      shellies.clear();
      await withDeadline(newClosed);
      expect(handlers[1].connected).toBe(false);
      // A stale delegate must not resurrect a removed transport.
      await expect(Promise.resolve(handlers[0].request('Shelly.GetDeviceInfo'))).rejects.toThrow();
      (handlers[0] as ReturnType<typeof shellies.websocket.create>).reconnect();
      await new Promise<void>((resolve) => setTimeout(resolve, 60));
      expect(handlers.filter((handler) => handler.connected)).toHaveLength(0);
    } finally {
      await Promise.all(handlers.map((handler) => handler.destroy()));
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  test('failed attempts close real sockets before a successful retry adopts one', async () => {
    const server = new WebSocketServer({ host: '127.0.0.1', port: 0 });
    await new Promise<void>((resolve) => server.once('listening', resolve));
    let fail = true;
    server.on('connection', (socket) => socket.on('message', (raw) => {
      const request = JSON.parse(raw.toString()) as { id: number };
      socket.send(JSON.stringify(fail
        ? { id: request.id, error: { code: -32000, message: 'discovery failed' } }
        : { id: request.id, result: info }));
    }));
    const shellies = new DiscoverableShellies({
      autoLoadStatus: false,
      websocket: { clientId: 'discovery-cleanup-test', pingInterval: 0, reconnectInterval: 0, requestTimeout: 1 },
    });
    const handlers: RpcHandler[] = [];
    const create = shellies.websocket.create.bind(shellies.websocket);
    jest.spyOn(shellies.websocket, 'create').mockImplementation((...args) => {
      const handler = create(...args);
      handlers.push(handler);
      return handler;
    });
    const target = { ...identifiers, hostname: `127.0.0.1:${(server.address() as AddressInfo).port}` };

    try {
      await shellies.discover(target);
      await shellies.discover(target);
      expect(handlers.filter((handler) => handler.connected)).toHaveLength(0);
      expect(shellies.size).toBe(0);

      fail = false;
      await shellies.discover(target);
      expect(handlers.filter((handler) => handler.connected)).toHaveLength(1);
      expect(shellies.get(info.id)?.rpcHandler).toBe(handlers[2]);
    } finally {
      await Promise.all(handlers.map((handler) => handler.destroy()));
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
