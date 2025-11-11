"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Illuminance = void 0;
const base_1 = require("./base");
/**
 * The Illuminance component handles the monitoring of the device's illuminance sensors.
 */
class Illuminance extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Illuminance', device, id);
        /**
         * Illuminance in lux (null if a valid value could not be obtained) (if applicable).
         */
        this.lux = null;
        /**
         * Illuminance level interpreted according to dark_thr/bright_thr (null if valid value could not be obtained):
         * lux below dark_thr is interpreted as dark, lux between dark_thr and bright_thr is interpreted as twilight,
         * lux above bright_thr is interpreted as bright.
         */
        this.illumination = null;
    }
}
__decorate([
    base_1.characteristic
], Illuminance.prototype, "lux", void 0);
__decorate([
    base_1.characteristic
], Illuminance.prototype, "illumination", void 0);
__decorate([
    base_1.characteristic
], Illuminance.prototype, "errors", void 0);
exports.Illuminance = Illuminance;
//# sourceMappingURL=illuminance.js.map