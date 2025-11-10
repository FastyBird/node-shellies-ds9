"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlusRGBWPm = void 0;
const base_1 = require("./base");
const components_1 = require("../components");
class ShellyPlusRGBWPm extends base_1.MultiProfileDevice {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.ethernet = new components_1.Ethernet(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.input0 = new components_1.Input(this, 0);
        this.input1 = new components_1.Input(this, 1);
        this.input2 = new components_1.Input(this, 2);
        this.input3 = new components_1.Input(this, 3);
        this.light0 = new components_1.Light(this, 0);
        this.light1 = new components_1.Light(this, 1);
        this.light2 = new components_1.Light(this, 2);
        this.light3 = new components_1.Light(this, 3);
        this.rgb0 = new components_1.Rgb(this, 0);
        this.rgbw0 = new components_1.Rgbw(this, 0);
        this.script = new components_1.Script(this);
        this.ui = new components_1.Ui(this);
    }
}
ShellyPlusRGBWPm.model = 'SNDC-0D4P10WW';
ShellyPlusRGBWPm.modelName = 'Shelly Plus RGBW PM';
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "ethernet", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "input0", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "input1", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "input2", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "input3", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "light0", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "light1", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "light2", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "light3", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "rgb0", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "rgbw0", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "script", void 0);
__decorate([
    base_1.component
], ShellyPlusRGBWPm.prototype, "ui", void 0);
exports.ShellyPlusRGBWPm = ShellyPlusRGBWPm;
base_1.Device.registerClass(ShellyPlusRGBWPm);
//# sourceMappingURL=shelly-plus-rgbw-pm.js.map