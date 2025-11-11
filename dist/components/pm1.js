"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pm1 = void 0;
const base_1 = require("./base");
/**
 * The PM1 component handles electrical power metering capabilities.
 */
class Pm1 extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Pm1', device, id);
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
], Pm1.prototype, "voltage", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "current", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "apower", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "aprtpower", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "pf", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "freq", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "aenergy", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "ret_aenergy", void 0);
__decorate([
    base_1.characteristic
], Pm1.prototype, "errors", void 0);
exports.Pm1 = Pm1;
//# sourceMappingURL=pm1.js.map