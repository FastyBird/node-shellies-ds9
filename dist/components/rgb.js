"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rgb = void 0;
const base_1 = require("./base");
/**
 * The RGB component handles an output with possibility to change color and brightness of an RGB LED load. Component has additional on/off
 * control. It has a night mode capability that can reduce brightness in a selected period of time.
 */
class Rgb extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Rgb', device, id);
        /**
         * Source of the last command, for example, init, WS_in, http, ...
         */
        this.source = '';
        /**
         * True if the output channel is currently on, false otherwise.
         */
        this.output = false;
        /**
         * Current Red, Green, Blue [r,g,b] level 0..255.
         */
        this.rgb = [0, 0, 0];
        /**
         * Current brightness level (in percent).
         */
        this.brightness = 0;
        /**
         * Information about the temperature (shown if applicable).
         */
        this.temperature = {
            tC: null,
            tF: null,
        };
    }
    /**
     * Sets the output and brightness level of the light.
     * At least one of `on` and `brightness` must be specified.
     *
     * @param on - Whether to switch on or off.
     * @param brightness - Brightness level.
     * @param rgb - Red, Green, Blue [r,g,b] - each value represents level between 0..255.
     * @param transition_duration - Transition time in seconds - time between change from current brightness level and color to desired
     *                              brightness level and color in request.
     * @param toggle_after - Flip-back timer, in seconds.
     * @param offset - Set current brightness level with applied offset. Cannot be used together with brightness. Boundaries [-100, 100]
     */
    set(on, brightness, rgb, transition_duration, toggle_after, offset) {
        return this.rpc('Set', {
            id: this.id,
            on,
            brightness,
            rgb,
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
}
__decorate([
    base_1.characteristic
], Rgb.prototype, "source", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "output", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "rgb", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "brightness", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "timer_started_at", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "timer_duration", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "transition", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "temperature", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "aenergy", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "apower", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "voltage", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "current", void 0);
__decorate([
    base_1.characteristic
], Rgb.prototype, "errors", void 0);
exports.Rgb = Rgb;
//# sourceMappingURL=rgb.js.map