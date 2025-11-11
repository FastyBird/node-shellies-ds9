"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPlugAzGen3 = exports.ShellyOutdoorPlugSGen3 = exports.ShellyPlugSGen3 = void 0;
const base_1 = require("../base");
const components_1 = require("../../components");
class ShellyPlugSGen3 extends base_1.Device {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.switch0 = new components_1.Switch(this, 0);
        this.script = new components_1.Script(this);
        this.ui = new components_1.PlugsUi(this);
    }
}
ShellyPlugSGen3.model = 'S3PL-00112EU';
ShellyPlugSGen3.modelName = 'Shelly Plug S Gen3';
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "switch0", void 0);
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "script", void 0);
__decorate([
    base_1.component
], ShellyPlugSGen3.prototype, "ui", void 0);
exports.ShellyPlugSGen3 = ShellyPlugSGen3;
base_1.Device.registerClass(ShellyPlugSGen3);
class ShellyOutdoorPlugSGen3 extends ShellyPlugSGen3 {
}
exports.ShellyOutdoorPlugSGen3 = ShellyOutdoorPlugSGen3;
ShellyOutdoorPlugSGen3.model = 'S3PL-20112EU';
ShellyOutdoorPlugSGen3.modelName = 'Shelly Outdoor Plug S Gen3';
base_1.Device.registerClass(ShellyOutdoorPlugSGen3);
class ShellyPlugAzGen3 extends ShellyPlugSGen3 {
}
exports.ShellyPlugAzGen3 = ShellyPlugAzGen3;
ShellyPlugAzGen3.model = 'S3PL-10112EU';
ShellyPlugAzGen3.modelName = 'Shelly Plug AZ Gen3';
base_1.Device.registerClass(ShellyPlugAzGen3);
//# sourceMappingURL=shelly-plug.js.map