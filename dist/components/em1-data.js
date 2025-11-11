"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Em1Data = void 0;
const base_1 = require("./base");
/**
 * The EMData component stores data from an energy meter.
 */
class Em1Data extends base_1.ComponentWithId {
    constructor(device, id = 0) {
        super('Em1Data', device, id);
        /**
         * Total active energy, Wh.
         */
        this.total_act_energy = 0;
        /**
         * Total active returned energy, Wh.
         */
        this.total_act_ret_energy = 0;
    }
    /**
     * @param ts - UNIX timestamp of the first interval. Used for selecting the next data chunk when the response is too large
     *             to fit in one call. Default is 0.
     */
    getRecords(ts) {
        return this.rpc('GetRecords', {
            id: this.id,
            ts,
        });
    }
    /**
     * @param ts - UNIX timestamp of the first record. Any record with data having a timestamp between ts and end_ts will be retrieved.
     * @param end_ts - UNIX timestamp of the last record to get (if available). If the response is too big, it will be chunked.
     *                 The default is to get all available records without limit.
     * @param add_keys - If false will not print the key array in the response. Default is true.
     */
    getData(ts, end_ts, add_keys) {
        return this.rpc('GetData', {
            id: this.id,
            ts,
            end_ts,
            add_keys,
        });
    }
    deleteAllData() {
        return this.rpc('DeleteAllData', {
            id: this.id,
        });
    }
    resetCounters() {
        return this.rpc('ResetCounters', {
            id: this.id,
        });
    }
    /**
     * @param ts - UNIX timestamp of the first record. It must align with the first second of the selected time granularity.
     * @param period - Period over which to accumulate energies, possible values are 300, 900, 1800, or 3600 seconds.
     * @param end_ts - UNIX timestamp of the last record to get (if available). Default is to get all available records if the response
     *                 is too big - it will be chunked.
     * @param add_keys - If false will not print the key array in the response. Default is true.
     */
    getNetEnergies(ts, period, end_ts, add_keys) {
        return this.rpc('GetNetEnergies', {
            id: this.id,
            ts,
            end_ts,
            period,
            add_keys,
        });
    }
    handleEvent(event) {
        switch (event.event) {
            case 'data':
                this.emit('data', event.data);
                break;
            default:
                super.handleEvent(event);
        }
    }
}
__decorate([
    base_1.characteristic
], Em1Data.prototype, "total_act_energy", void 0);
__decorate([
    base_1.characteristic
], Em1Data.prototype, "total_act_ret_energy", void 0);
__decorate([
    base_1.characteristic
], Em1Data.prototype, "errors", void 0);
exports.Em1Data = Em1Data;
//# sourceMappingURL=em1-data.js.map