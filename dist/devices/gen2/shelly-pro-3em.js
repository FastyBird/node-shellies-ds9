"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellyPro3Em3CT63 = exports.ShellyPro3Em400 = exports.ShellyPro3Em = void 0;
const base_1 = require("../base");
const components_1 = require("../../components");
class ShellyPro3Em extends base_1.Device {
    constructor() {
        super(...arguments);
        this.wifi = new components_1.WiFi(this);
        this.bluetoothLowEnergy = new components_1.BluetoothLowEnergy(this);
        this.cloud = new components_1.Cloud(this);
        this.mqtt = new components_1.Mqtt(this);
        this.outboundWebSocket = new components_1.OutboundWebSocket(this);
        this.em0 = new components_1.Em(this, 0);
        this.em10 = new components_1.Em1(this, 0);
        this.em11 = new components_1.Em1(this, 1);
        this.em12 = new components_1.Em1(this, 2);
        this.emData0 = new components_1.EmData(this, 0);
        this.em1Data0 = new components_1.Em1Data(this, 0);
        this.em1Data1 = new components_1.Em1Data(this, 1);
        this.em1Data2 = new components_1.Em1Data(this, 2);
        this.script = new components_1.Script(this);
    }
}
ShellyPro3Em.model = 'SPEM-003CEBEU';
ShellyPro3Em.modelName = 'Shelly Pro 3EM';
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "wifi", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "cloud", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "em0", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "em10", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "em11", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "em12", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "emData0", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "em1Data0", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "em1Data1", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "em1Data2", void 0);
__decorate([
    base_1.component
], ShellyPro3Em.prototype, "script", void 0);
exports.ShellyPro3Em = ShellyPro3Em;
base_1.Device.registerClass(ShellyPro3Em);
class ShellyPro3Em400 extends ShellyPro3Em {
}
exports.ShellyPro3Em400 = ShellyPro3Em400;
ShellyPro3Em400.model = 'SPEM-003CEBEU400';
ShellyPro3Em400.modelName = 'Shelly Pro 3EM-400';
base_1.Device.registerClass(ShellyPro3Em400);
class ShellyPro3Em3CT63 extends ShellyPro3Em {
}
exports.ShellyPro3Em3CT63 = ShellyPro3Em3CT63;
ShellyPro3Em3CT63.model = 'SPEM-003CEBEU63';
ShellyPro3Em3CT63.modelName = 'Shelly Pro 3EM-3CT63';
base_1.Device.registerClass(ShellyPro3Em3CT63);
//# sourceMappingURL=shelly-pro-3em.js.map