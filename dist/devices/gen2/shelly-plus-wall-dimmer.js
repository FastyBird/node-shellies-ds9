"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusWallDimmer = void 0;
const base_1 = require("../base");
const components_1 = require("../../components");
class ShellyPlusWallDimmer extends base_1.Device {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.light0 = new components_1.Light(this, 0);
        this.script = new components_1.Script(this);
        this.ui = new components_1.WdUi(this);
    }
}
ShellyPlusWallDimmer.model = 'SNDM-0013US';
ShellyPlusWallDimmer.modelName = 'Shelly Plus Wall Dimmer';
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "light0", void 0);
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "script", void 0);
__decorate([
    base_1.component
], ShellyPlusWallDimmer.prototype, "ui", void 0);
exports.ShellyPlusWallDimmer = ShellyPlusWallDimmer;
base_1.Device.registerClass(ShellyPlusWallDimmer);
//# sourceMappingURL=shelly-plus-wall-dimmer.js.map