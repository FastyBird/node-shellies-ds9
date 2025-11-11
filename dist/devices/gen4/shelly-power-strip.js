"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPowerStripGen4 = void 0;
const base_1 = require("../base");
const components_1 = require("../../components");
class ShellyPowerStripGen4 extends base_1.MultiProfileDevice {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.switch0 = new components_1.Switch(this, 0);
        this.switch1 = new components_1.Switch(this, 1);
        this.switch2 = new components_1.Switch(this, 2);
        this.switch3 = new components_1.Switch(this, 3);
        this.script = new components_1.Script(this);
        this.ui = new components_1.PowerStripUi(this);
    }
}
ShellyPowerStripGen4.model = 'S4PL-00416EU';
ShellyPowerStripGen4.modelName = 'Shelly Power Strip Gen4';
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "switch1", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "switch2", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "switch3", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "script", void 0);
__decorate([
    base_1.component
], ShellyPowerStripGen4.prototype, "ui", void 0);
exports.ShellyPowerStripGen4 = ShellyPowerStripGen4;
base_1.Device.registerClass(ShellyPowerStripGen4);
//# sourceMappingURL=shelly-power-strip.js.map