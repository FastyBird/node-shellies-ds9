"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const base_1 = require("./base");
/**
 * The Input component handles the external digital or analog input terminals of a device.
 */
class Input extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Input', device, id);
    }
    handleEvent(event) {
        switch (event.event) {
            case 'btn_down':
                this.emit('buttonDown');
                break;
            case 'btn_up':
                this.emit('buttonUp');
                break;
            case 'single_push':
                this.emit('singlePush');
                break;
            case 'double_push':
                this.emit('doublePush');
                break;
            case 'triple_push':
                this.emit('triplePush');
                break;
            case 'long_push':
                this.emit('longPush');
                break;
            default:
                super.handleEvent(event);
        }
    }
    /**
     * Emit input events on demand without an actual change on the physical inputs
     * (only for type button)
     * @param event_type - Event to be emitted, one of: btn_down, btn_up, single_push, double_push, triple_push and long_push.
     */
    trigger(event_type) {
        return this.rpc('Trigger', {
            id: this.id,
            event_type,
        });
    }
    /**
     * This method resets associated counters.
     * @param type - Array of strings, selects which counter to reset.
     */
    resetCounters(type) {
        return this.rpc('ResetCounters', {
            id: this.id,
            type,
        });
    }
}
__decorate([
    base_1.characteristic
], Input.prototype, "state", void 0);
__decorate([
    base_1.characteristic
], Input.prototype, "percent", void 0);
__decorate([
    base_1.characteristic
], Input.prototype, "xpercent", void 0);
__decorate([
    base_1.characteristic
], Input.prototype, "counts", void 0);
__decorate([
    base_1.characteristic
], Input.prototype, "freq", void 0);
__decorate([
    base_1.characteristic
], Input.prototype, "xfreq", void 0);
__decorate([
    base_1.characteristic
], Input.prototype, "errors", void 0);
exports.Input = Input;
//# sourceMappingURL=input.js.map