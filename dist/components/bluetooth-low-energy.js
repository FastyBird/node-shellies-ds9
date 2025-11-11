"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BluetoothLowEnergy = void 0;
const base_1 = require("./base");
/**
 * The Bluetooth Low Energy component is called BLE. It handles bluetooth services of a device.
 */
class BluetoothLowEnergy extends base_1.Component {
    constructor(device) {
        super('BLE', device);
    }
    /**
     * Associate a BLUTRV device with the gateway or associate an already associated BLUTRV device with BTHome temperature
     * and/or window sensors (BLUHT, BLUDW) which can either be existing or will be added.
     *
     * @param blutrv_id - If not specified discover and associate new BLUTRV device with the gateway or ID of the BluTrv component
     *                    instance to perform sensor associations (a device doesn't need to be in pairing mode in this case)
     * @param duration - Max discovery duration, seconds. Defaults to 30 if not provided.
     * @param rssi_thr - Defaults to -80 if not provided.
     */
    startBluTrvAssociations(blutrv_id, duration, rssi_thr) {
        return this.rpc('StartBluTrvAssociations', {
            blutrv_id,
            duration,
            rssi_thr,
        });
    }
}
__decorate([
    base_1.characteristic
], BluetoothLowEnergy.prototype, "blutrv_assoc", void 0);
exports.BluetoothLowEnergy = BluetoothLowEnergy;
//# sourceMappingURL=bluetooth-low-energy.js.map