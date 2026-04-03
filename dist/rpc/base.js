"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcHandler = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
/**
 * Base class for all remote procedure call (RPC) handlers.
 */
class RpcHandler extends eventemitter3_1.default {
    /**
     * @param protocol - The protocol used to send RPCs.
     */
    constructor(protocol) {
        super();
        this.protocol = protocol;
    }
    /**
     * Resets the reconnect interval index back to 0.
     * No-op for handlers that don't support reconnection.
     */
    resetReconnectInterval() {
        // no-op by default; overridden in WebSocketRpcHandler
    }
}
exports.RpcHandler = RpcHandler;
//# sourceMappingURL=base.js.map