"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cover = void 0;
const base_1 = require("./base");
/**
 * The Cover component handles the operation of motorized garage doors, window blinds, roof skylights, etc.
 */
class Cover extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Cover', device, id);
        /**
         * Source of the last command.
         */
        this.source = '';
        /**
         * The current state.
         */
        this.state = 'stopped';
        /**
         * Active power in Watts.
         */
        this.apower = 0;
        /**
         * Volts.
         */
        this.voltage = 0;
        /**
         * Amperes.
         */
        this.current = 0;
        /**
         * power factor.
         */
        this.pf = 0;
        /**
         * network frequency, Hz.
         */
        this.freq = 0;
        /**
         * Energy counter information, same as in the Switch component status.
         */
        this.aenergy = {
            total: 0,
            by_minute: [],
            minute_ts: 0,
        };
        /**
         * Only present if Cover is calibrated.
         * Represents the current position in percent from 0 (fully closed) to 100 (fully open); null if the position is unknown.
         */
        this.current_pos = null;
        /**
         * Only present if Cover is calibrated and is actively moving to a requested position in either open or closed directions.
         * Represents the target position in percent from 0 (fully closed) to 100 (fully open); null if the target position has been
         * reached or the movement was canceled.
         */
        this.target_pos = null;
        /**
         * False if Cover is not calibrated and only discrete open/close is possible; true if Cover is calibrated and can be
         * commanded to go to arbitrary positions between fully open and fully closed.
         */
        this.pos_control = false;
        /**
         * Direction of the last movement: open/close or null when unknown.
         */
        this.last_direction = null;
    }
    /**
     * Starts the calibration procedure.
     */
    calibrate() {
        return this.rpc('Calibrate', {
            id: this.id,
        });
    }
    /**
     * Opens the cover.
     *
     * @param duration - Move in open direction for the specified time (in seconds).
     */
    open(duration) {
        return this.rpc('Open', {
            id: this.id,
            duration,
        });
    }
    /**
     * Closes the cover.
     *
     * @param duration - Move in close direction for the specified time (in seconds).
     */
    close(duration) {
        return this.rpc('Close', {
            id: this.id,
            duration,
        });
    }
    /**
     * Stops any ongoing movement.
     */
    stop() {
        return this.rpc('Stop', {
            id: this.id,
        });
    }
    /**
     * Moves the cover to the given position.
     * One, but not both, of `pos` and `rel` must be specified.
     *
     * @param pos - An absolute position (in percent).
     * @param rel - A relative position (in percent).
     * @param slat_pos - Same semantics as pos and rel but applied to slat position.
     * @param slat_rel - Same semantics as pos and rel but applied to slat position.
     */
    goToPosition(pos, rel, slat_pos, slat_rel) {
        return this.rpc('GoToPosition', {
            id: this.id,
            pos,
            rel,
            slat_pos,
            slat_rel,
        });
    }
    /**
     * This method resets associated counters.
     *
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
], Cover.prototype, "source", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "state", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "apower", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "voltage", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "current", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "pf", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "freq", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "aenergy", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "current_pos", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "target_pos", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "move_timeout", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "move_started_at", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "pos_control", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "last_direction", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "temperature", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "slat_pos", void 0);
__decorate([
    base_1.characteristic
], Cover.prototype, "errors", void 0);
exports.Cover = Cover;
//# sourceMappingURL=cover.js.map