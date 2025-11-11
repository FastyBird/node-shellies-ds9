"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shelly3EmGen3 = void 0;
const base_1 = require("../base");
const components_1 = require("../../components");
class Shelly3EmGen3 extends base_1.Device {
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
Shelly3EmGen3.model = 'S3EM-003CXCEU63';
Shelly3EmGen3.modelName = 'Shelly 3EM-63 G3';
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "wifi", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "bluetoothLowEnergy", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "cloud", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "mqtt", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "outboundWebSocket", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "em0", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "em10", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "em11", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "em12", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "emData0", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "em1Data0", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "em1Data1", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "em1Data2", void 0);
__decorate([
    base_1.component
], Shelly3EmGen3.prototype, "script", void 0);
exports.Shelly3EmGen3 = Shelly3EmGen3;
base_1.Device.registerClass(Shelly3EmGen3);
//# sourceMappingURL=shelly-3em.js.map