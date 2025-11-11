import { Component } from './base';
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
export declare class OutboundWebSocket extends Component<OutboundWebSocketAttributes, OutboundWebSocketConfig> implements OutboundWebSocketAttributes {
    /**
     * True if a device is connected to a websocket outbound connection or false otherwise.
     */
    readonly connected: boolean;
    constructor(device: Device);
}
//# sourceMappingURL=outbound-websocket.d.ts.map