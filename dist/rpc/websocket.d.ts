/// <reference types="node" />
/// <reference types="node" />
import WebSocket from 'ws';
import { JSONRPCClientWithAuthentication } from './auth';
import { RpcHandler, RpcParams } from './base';
/**
 * Options for the WebSocket RPC handler.
 */
export interface WebSocketRpcHandlerOptions {
    /**
     * A unique ID used to identify this client when communicating with the Shelly device.
     */
    clientId: string;
    /**
     * The time, in seconds, to wait for a response before a request is aborted.
     */
    requestTimeout: number;
    /**
     * The interval, in seconds, at which ping requests should be made to verify that the connection is open.
     * Set to `0` to disable.
     */
    pingInterval: number;
    /**
     * The interval, in seconds, at which a connection attempt should be made after a socket has been closed.
     * If an array is specified, the first value of the array will be used for the first connection attempt, the second
     * value for the second attempt and so on. When the last item in the array has been reached, it will be used for
     * all subsequent connection attempts; unless the value is `0`, in which case no more attempts will be made.
     * Set to `0` or an empty array to disable.
     */
    reconnectInterval: number | number[];
    /**
     * The password to use if the Shelly device requires authentication.
     */
    password?: string;
}
/**
 * Makes remote procedure calls (RPCs) over WebSockets.
 */
export declare class WebSocketRpcHandler extends RpcHandler {
    readonly hostname: string;
    readonly options: WebSocketRpcHandlerOptions;
    /**
     * The underlying websocket.
     */
    protected socket: WebSocket;
    /**
     * Handles parsing of JSON RPC requests and responses.
     */
    protected readonly client: JSONRPCClientWithAuthentication;
    /**
     * Timeout used to schedule connection attempts and to send periodic ping requests.
     */
    protected timeout: ReturnType<typeof setTimeout> | null;
    /**
     * Indicates which value in the `reconnectInterval` option is currently being used.
     */
    protected reconnectIntervalIndex: number;
    /**
     * Set to true when destroy() is called to distinguish intentional
     * shutdown from device-initiated or network-initiated close events.
     */
    protected destroyed: boolean;
    /**
     * Event handlers bound to `this`.
     */
    protected readonly openHandler: () => void;
    protected readonly closeHandler: (code: number, reason: Buffer) => void;
    protected readonly messageHandler: (data: Buffer) => void;
    protected readonly pongHandler: () => void;
    protected readonly errorHandler: (error: Error) => void;
    /**
     * @param hostname - The hostname of the Shelly device to connect to.
     * @param opts - Configuration options for this handler.
     */
    constructor(hostname: string, options: WebSocketRpcHandlerOptions);
    get connected(): boolean;
    request<T>(method: string, params?: RpcParams): PromiseLike<T>;
    /**
     * Resets the reconnect interval index back to 0.
     * Call this before terminating a socket to ensure the next reconnection
     * attempt uses the shortest interval instead of an escalated backoff delay.
     */
    resetReconnectInterval(): void;
    /**
     * Triggers an immediate reconnection attempt.
     * Resets the backoff interval, terminates the current socket
     * (if any), and schedules a new connection attempt.
     */
    reconnect(): void;
    destroy(): PromiseLike<void>;
    /**
     * Creates a new websocket and registers event handlers.
     * @param url - The URL to connect to.
     */
    protected createSocket(url: string): WebSocket;
    /**
     * Connects the websocket.
     * Creates a new socket if the current is closed.
     */
    protected connect(): Promise<void>;
    /**
     * Returns a Promise that will be fulfilled once the socket is connected.
     */
    protected awaitConnect(): Promise<void>;
    /**
     * Schedules a connection attempt after a time period specified by the `reconnectInterval` configuration option.
     * @return The time, in milliseconds, that the next connection attempt will be made in; or `null` if none has been scheduled.
     */
    protected scheduleConnect(): number | null;
    /**
     * Disconnects the socket and unregisters event handlers.
     */
    protected disconnect(): Promise<void>;
    /**
     * Returns a Promise that will be fulfilled once the socket is disconnected.
     */
    protected awaitDisconnect(): Promise<void>;
    /**
     * Handles a request.
     * @param payload - The request payload.
     */
    protected handleRequest(payload: RpcParams): Promise<void>;
    /**
     * Sends a request over the websocket.
     * @param payload - The request payload.
     */
    protected sendRequest(payload: RpcParams): Promise<void>;
    /**
     * Sends a ping over the websocket.
     */
    protected sendPing(): void;
    /**
     * Clears any currently pending timeout.
     */
    protected clearTimeout(): void;
    /**
     * Handles 'open' events from the socket.
     */
    protected handleOpen(): void;
    /**
     * Handles 'close' events from the socket.
     * @param code - A status code.
     * @param reason - A human-readable explanation why the connection was closed.
     */
    protected handleClose(code: number, reason: Buffer): void;
    /**
     * Handles incoming messages.
     * @param data The message data, as a JSON encoded string.
     */
    protected handleMessage(data: Buffer): void;
    /**
     * Handles pongs received from the device.
     */
    protected handlePong(): void;
    /**
     * Handles errors from the websocket.
     * @param error - The error.
     */
    protected handleError(error: Error): void;
}
/**
 * Factory class used to create `WebSocketRpcHandler` instances.
 */
export declare class WebSocketRpcHandlerFactory {
    /**
     * Default `WebSocketRpcHandler` options.
     */
    readonly defaultOptions: WebSocketRpcHandlerOptions;
    /**
     * Creates a new `WebSocketRpcHandler`.
     * @param hostname - The hostname of the Shelly device to connect to.
     * @param opts - Configuration options for the handler.
     */
    create(hostname: string, opts?: Partial<WebSocketRpcHandlerOptions>): WebSocketRpcHandler;
}
//# sourceMappingURL=websocket.d.ts.map