import { ComponentWithId } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';
export interface Em1DataAttributes {
    id: number;
    total_act_energy: number;
    total_act_ret_energy: number;
    errors?: string[];
}
export interface Em1DataConfig {
}
export interface Em1DataGetRecordsResponse {
    data_blocks: {
        ts: number;
        period: number;
        records: number;
    }[];
}
export interface Em1DataGetDataResponse {
    keys: string[];
    data: {
        ts: number;
        period: number;
        values: number[][];
    }[];
    next_record_ts: number;
}
/**
 * The EMData component stores data from an energy meter.
 */
export declare class Em1Data extends ComponentWithId<Em1DataAttributes, Em1DataConfig> implements Em1DataAttributes {
    /**
     * Total active energy, Wh.
     */
    readonly total_act_energy: number;
    /**
     * Total active returned energy, Wh.
     */
    readonly total_act_ret_energy: number;
    /**
     * Error condition occurred. May contain database_error or ct_type_not_set, (shown if the error is present).
     */
    readonly errors: string[] | undefined;
    constructor(device: Device, id?: number);
    /**
     * @param ts - UNIX timestamp of the first interval. Used for selecting the next data chunk when the response is too large
     *             to fit in one call. Default is 0.
     */
    getRecords(ts?: number): PromiseLike<Em1DataGetRecordsResponse>;
    /**
     * @param ts - UNIX timestamp of the first record. Any record with data having a timestamp between ts and end_ts will be retrieved.
     * @param end_ts - UNIX timestamp of the last record to get (if available). If the response is too big, it will be chunked.
     *                 The default is to get all available records without limit.
     * @param add_keys - If false will not print the key array in the response. Default is true.
     */
    getData(ts: number, end_ts?: number, add_keys?: boolean): PromiseLike<Em1DataGetDataResponse>;
    deleteAllData(): PromiseLike<null>;
    resetCounters(): PromiseLike<null>;
    /**
     * @param ts - UNIX timestamp of the first record. It must align with the first second of the selected time granularity.
     * @param period - Period over which to accumulate energies, possible values are 300, 900, 1800, or 3600 seconds.
     * @param end_ts - UNIX timestamp of the last record to get (if available). Default is to get all available records if the response
     *                 is too big - it will be chunked.
     * @param add_keys - If false will not print the key array in the response. Default is true.
     */
    getNetEnergies(ts: number, period: number, end_ts?: number, add_keys?: boolean): PromiseLike<null>;
    handleEvent(event: RpcEvent): void;
}
//# sourceMappingURL=em1-data.d.ts.map