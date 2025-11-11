"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
const base_1 = require("./base");
/**
 * The Light component handles a dimmable light output with additional on/off control.
 */
class Light extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Light', device, id);
        /**
         * Source of the last command, for example, init, WS_in, http, ...
         */
        this.source = '';
        /**
         * True if the output channel is currently on, false otherwise.
         */
        this.output = false;
        /**
         * Current brightness level (in percent).
         */
        this.brightness = 0;
        /**
         * Information about the temperature (if applicable).
         */
        this.temperature = {
            tC: null,
            tF: null,
        };
    }
    /**
     * This method sets the output and brightness level of the Light component.
     *
     * @param on - True for light on, false otherwise.
     * @param brightness - Brightness level.
     * @param transition_duration - Transition time in seconds - time between change from current brightness level to desired
     *                              brightness level in request
     * @param toggle_after - Optional flip-back timer in seconds.
     * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
     */
    set(on, brightness, transition_duration, toggle_after, offset) {
        return this.rpc('Set', {
            id: this.id,
            on,
            brightness,
            transition_duration,
            toggle_after,
            offset,
        });
    }
    /**
     * This method toggles the output state.
     */
    toggle() {
        return this.rpc('Toggle', {
            id: this.id,
        });
    }
    /**
     * This method dims up the brightness level.
     *
     * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
     *                    If not provided, the value is defaulted to button_fade_rate.
     */
    dimUp(fade_rate) {
        return this.rpc('DimUp', {
            id: this.id,
            fade_rate,
        });
    }
    /**
     * This method dims down the brightness level.
     *
     * @param fade_rate - Fade rate of the brightness level dimming. Range [1,5] where 5 is fastest, 1 is slowest.
     *                    If not provided, the value is defaulted to button_fade_rate.
     */
    dimDown(fade_rate) {
        return this.rpc('DimDown', {
            id: this.id,
            fade_rate,
        });
    }
    /**
     * This method stops the dimming of the brightness level.
     */
    dimStop() {
        return this.rpc('DimStop', {
            id: this.id,
        });
    }
    /**
     * This method (if applicable) sets the output and brightness level of all Light components in the device.
     *
     * @param on - True for light on, false otherwise.
     * @param brightness - Brightness level.
     * @param transition_duration - Transition time in seconds - time between change from current brightness level to desired
     *                              brightness level in request
     * @param toggle_after - Optional flip-back timer in seconds.
     * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
     */
    setAll(on, brightness, transition_duration, toggle_after, offset) {
        return this.rpc('SetAll', {
            id: this.id,
            on,
            brightness,
            transition_duration,
            toggle_after,
            offset,
        });
    }
    /**
     * This method (if applicable) starts calibration of the device's outputs.
     */
    calibrate() {
        return this.rpc('Calibrate', {
            id: this.id,
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
], Light.prototype, "source", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "output", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "brightness", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "timer_started_at", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "timer_duration", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "transition", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "temperature", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "aenergy", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "apower", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "voltage", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "current", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "calibration", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "errors", void 0);
__decorate([
    base_1.characteristic
], Light.prototype, "flags", void 0);
exports.Light = Light;
//# sourceMappingURL=light.js.map