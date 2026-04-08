"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketRpcHandlerFactory = exports.WebSocketRpcHandler = void 0;
const crypto_1 = require("crypto");
const ws_1 = __importDefault(require("ws"));
const auth_1 = require("./auth");
const base_1 = require("./base");
/**
 * Makes remote procedure calls (RPCs) over WebSockets.
 */
class WebSocketRpcHandler extends base_1.RpcHandler {
    /**
     * @param hostname - The hostname of the Shelly device to connect to.
     * @param opts - Configuration options for this handler.
     */
    constructor(hostname, options) {
        super('websocket');
        this.hostname = hostname;
        this.options = options;
        /**
         * Timeout used to schedule connection attempts and to send periodic ping requests.
         */
        this.timeout = null;
        /**
         * Indicates which value in the `reconnectInterval` option is currently being used.
         */
        this.reconnectIntervalIndex = 0;
        /**
         * Set to true when destroy() is called to distinguish intentional
         * shutdown from device-initiated or network-initiated close events.
         */
        this.destroyed = false;
        /**
         * Event handlers bound to `this`.
         */
        this.openHandler = this.handleOpen.bind(this);
        this.closeHandler = this.handleClose.bind(this);
        this.messageHandler = this.handleMessage.bind(this);
        this.pongHandler = this.handlePong.bind(this);
        this.errorHandler = this.handleError.bind(this);
        this.socket = this.createSocket(`ws://${hostname}/rpc`);
        this.client = new auth_1.JSONRPCClientWithAuthentication((req) => this.handleRequest(req), options.password);
    }
    get connected() {
        return this.socket.readyState === ws_1.default.OPEN;
    }
    request(method, params) {
        this.emit('request', method, params);
        return this.client
            .timeout(this.options.requestTimeout * 1000)
            .request(method, params);
    }
    /**
     * Resets the reconnect interval index back to 0.
     * Call this before terminating a socket to ensure the next reconnection
     * attempt uses the shortest interval instead of an escalated backoff delay.
     */
    resetReconnectInterval() {
        this.reconnectIntervalIndex = 0;
    }
    /**
     * Triggers an immediate reconnection attempt.
     * Resets the backoff interval, terminates the current socket
     * (if any), and schedules a new connection attempt.
     */
    reconnect() {
        this.resetReconnectInterval();
        // Terminate the current socket to trigger handleClose → scheduleConnect
        if (this.socket.readyState === ws_1.default.OPEN || this.socket.readyState === ws_1.default.CONNECTING) {
            this.socket.terminate();
        }
        else {
            // Socket is already closed — schedule directly
            this.scheduleConnect();
        }
    }
    destroy() {
        this.destroyed = true;
        // clear any timeout
        this.clearTimeout();
        // reject all pending requests
        this.client.rejectAllPendingRequests('Connection closed');
        // disconnect the socket
        return this.disconnect();
    }
    /**
     * Creates a new websocket and registers event handlers.
     * @param url - The URL to connect to.
     */
    createSocket(url) {
        return new ws_1.default(url)
            .on('open', this.openHandler)
            .on('close', this.closeHandler)
            .on('message', this.messageHandler)
            .on('pong', this.pongHandler)
            .on('error', this.errorHandler);
    }
    /**
     * Connects the websocket.
     * Creates a new socket if the current is closed.
     */
    async connect() {
        switch (this.socket.readyState) {
            case ws_1.default.CLOSED:
            case ws_1.default.CLOSING:
                // the current socket is closed, disconnect and create a new one
                await this.disconnect();
                this.socket = this.createSocket(this.socket.url);
            // fall through
            case ws_1.default.CONNECTING:
                // wait for the socket to be connected
                await this.awaitConnect();
        }
    }
    /**
     * Returns a Promise that will be fulfilled once the socket is connected.
     */
    awaitConnect() {
        const s = this.socket;
        if (s.readyState === ws_1.default.CONNECTED) {
            // we're already connected
            return Promise.resolve();
        }
        else if (s.readyState !== ws_1.default.CONNECTING) {
            // reject if the socket isn't currently connecting
            return Promise.reject(new Error('WebSocket is not connecting'));
        }
        return new Promise((resolve, reject) => {
            // reject if the socket fails to connect
            const closeHandler = (code, reason) => {
                const msg = reason.length > 0 ? reason.toString() : `code: ${code}`;
                reject(new Error(`Error connecting to device (${msg})`));
            };
            s.once('close', closeHandler);
            // resolve once the socket is connected
            s.once('open', () => {
                s.removeEventListener('close', closeHandler);
                resolve();
            });
        });
    }
    /**
     * Schedules a connection attempt after a time period specified by the `reconnectInterval` configuration option.
     * @return The time, in milliseconds, that the next connection attempt will be made in; or `null` if none has been scheduled.
     */
    scheduleConnect() {
        const reconnectInterval = this.options.reconnectInterval;
        const intervals = !Array.isArray(reconnectInterval) ? [reconnectInterval] : reconnectInterval;
        // abort if no interval has been specified
        if (intervals.length === 0) {
            return null;
        }
        // get the current interval
        const interval = intervals[this.reconnectIntervalIndex] * 1000;
        // abort if the interval is a non-positive number
        if (interval <= 0) {
            return null;
        }
        // clear any timeout
        this.clearTimeout();
        // schedule a new connection attempt
        this.timeout = setTimeout(async () => {
            this.timeout = null;
            if (this.reconnectIntervalIndex < intervals.length - 1) {
                this.reconnectIntervalIndex++;
            }
            try {
                await this.connect();
            }
            catch (e) {
                this.emit('error', e);
            }
        }, interval);
        return interval;
    }
    /**
     * Disconnects the socket and unregisters event handlers.
     */
    async disconnect() {
        switch (this.socket.readyState) {
            case ws_1.default.OPEN:
            case ws_1.default.CONNECTING:
                // close the socket
                this.socket.close(1000, 'User request');
            // fall through
            case ws_1.default.CLOSING:
                // wait for the socket to be closed
                await this.awaitDisconnect();
        }
    }
    /**
     * Returns a Promise that will be fulfilled once the socket is disconnected.
     */
    awaitDisconnect() {
        const s = this.socket;
        if (s.readyState === ws_1.default.CLOSED) {
            // we're already disconnected
            return Promise.resolve();
        }
        else if (s.readyState !== ws_1.default.CLOSING) {
            // reject if the socket isn't closing
            return Promise.reject(new Error('WebSocket is not disconnecting'));
        }
        return new Promise((resolve) => {
            // resolve once the socket is disconnected
            s.once('close', resolve);
        });
    }
    /**
     * Handles a request.
     * @param payload - The request payload.
     */
    async handleRequest(payload) {
        // make sure we're connected
        await this.connect();
        // then send the request
        await this.sendRequest(payload);
    }
    /**
     * Sends a request over the websocket.
     * @param payload - The request payload.
     */
    sendRequest(payload) {
        try {
            // add our client ID to the payload
            const data = { src: this.options.clientId, ...payload };
            return new Promise((resolve, reject) => {
                // send the request
                this.socket.send(JSON.stringify(data), (error) => {
                    if (!error) {
                        resolve();
                    }
                    else {
                        reject(error);
                    }
                });
            });
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    /**
     * Sends a ping over the websocket.
     */
    sendPing() {
        // abort if pings are disabled or the socket isn't open
        if (this.options.pingInterval <= 0 || this.socket.readyState !== ws_1.default.OPEN) {
            return;
        }
        // clear the timeout
        this.clearTimeout();
        // send the ping
        this.socket.ping((error) => {
            if (error) {
                // ping send failed — socket is likely dead, terminate immediately
                // instead of waiting for the pong timeout
                this.clearTimeout();
                this.socket.terminate();
                return;
            }
        });
        // wait for a pong
        this.timeout = setTimeout(() => {
            // no pong received, terminate the connection
            this.socket.terminate();
        }, this.options.requestTimeout * 1000);
    }
    /**
     * Clears any currently pending timeout.
     */
    clearTimeout() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    /**
     * Handles 'open' events from the socket.
     */
    handleOpen() {
        // reset the reconnect index
        this.reconnectIntervalIndex = 0;
        this.emit('connect');
        // clear any timeout
        this.clearTimeout();
        // start sending pings
        if (this.options.pingInterval > 0) {
            this.timeout = setTimeout(() => this.sendPing(), this.options.pingInterval * 1000);
        }
    }
    /**
     * Handles 'close' events from the socket.
     * @param code - A status code.
     * @param reason - A human-readable explanation why the connection was closed.
     */
    handleClose(code, reason) {
        // clear any timeout
        this.clearTimeout();
        // remove event handlers
        this.socket
            .off('open', this.openHandler)
            .off('close', this.closeHandler)
            .off('message', this.messageHandler)
            .off('pong', this.pongHandler)
            .off('error', this.errorHandler);
        let reconnectIn = null;
        // Reconnect unless the handler was explicitly destroyed.
        // Previously this checked `code !== 1000`, but Shelly devices
        // can send code 1000 when closing a connection due to a
        // duplicate client ID — that should still trigger reconnection.
        if (!this.destroyed) {
            reconnectIn = this.scheduleConnect();
        }
        this.emit('disconnect', code, reason.toString(), reconnectIn);
    }
    /**
     * Handles incoming messages.
     * @param data The message data, as a JSON encoded string.
     */
    handleMessage(data) {
        // parse the data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let d;
        try {
            d = JSON.parse(data.toString());
        }
        catch (e) {
            this.emit('error', new Error(`Failed to parse WebSocket message: ${e.message}`));
            return;
        }
        if (d.id) {
            // this is a response, let the JSON RPC client handle it
            this.client.receive(d);
        }
        else if (d.method === 'NotifyStatus' || d.method === 'NotifyFullStatus') {
            // this is a status update
            this.emit('statusUpdate', d.params);
        }
        else if (d.method === 'NotifyEvent') {
            // this is an event
            this.emit('event', d.params);
        }
    }
    /**
     * Handles pongs received from the device.
     */
    handlePong() {
        // clear the timeout
        this.clearTimeout();
        // schedule a new ping
        if (this.options.pingInterval > 0) {
            this.timeout = setTimeout(() => this.sendPing(), this.options.pingInterval * 1000);
        }
    }
    /**
     * Handles errors from the websocket.
     * @param error - The error.
     */
    handleError(error) {
        this.emit('error', error);
    }
}
exports.WebSocketRpcHandler = WebSocketRpcHandler;
/**
 * Factory class used to create `WebSocketRpcHandler` instances.
 */
class WebSocketRpcHandlerFactory {
    constructor() {
        /**
         * Default `WebSocketRpcHandler` options.
         */
        this.defaultOptions = {
            clientId: 'node-shellies-ds9-' + (0, crypto_1.randomUUID)(),
            requestTimeout: 10,
            pingInterval: 30,
            reconnectInterval: [
                5,
                10,
                15,
                30,
                60,
                60,
            ],
        };
    }
    /**
     * Creates a new `WebSocketRpcHandler`.
     * @param hostname - The hostname of the Shelly device to connect to.
     * @param opts - Configuration options for the handler.
     */
    create(hostname, opts) {
        // get all options (with default values)
        const options = { ...this.defaultOptions, ...(opts || {}) };
        return new WebSocketRpcHandler(hostname, options);
    }
}
exports.WebSocketRpcHandlerFactory = WebSocketRpcHandlerFactory;
//# sourceMappingURL=websocket.js.map