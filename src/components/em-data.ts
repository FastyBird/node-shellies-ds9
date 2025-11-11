import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';

export interface EmDataAttributes {
  id: number;
  a_total_act_energy: number;
  a_total_act_ret_energy: number;
  b_total_act_energy: number;
  b_total_act_ret_energy: number;
  c_total_act_energy: number;
  c_total_act_ret_energy: number;
  total_act: number;
  total_act_ret: number;
  errors?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmDataConfig {}

export interface EmDataGetRecordsResponse {
  data_blocks: {
    ts: number;
    period: number;
    records: number;
  }[];
}

export interface EmDataGetDataResponse {
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
export class EmData extends ComponentWithId<EmDataAttributes, EmDataConfig> implements EmDataAttributes {
  /**
   * Total active energy on phase A, Wh.
   */
  @characteristic
  readonly a_total_act_energy: number = 0;

  /**
   * Total active returned energy on phase A, Wh.
   */
  @characteristic
  readonly a_total_act_ret_energy: number = 0;

  /**
   * Total active energy on phase B, Wh.
   */
  @characteristic
  readonly b_total_act_energy: number = 0;

  /**
   * Total active returned energy on phase B, Wh.
   */
  @characteristic
  readonly b_total_act_ret_energy: number = 0;

  /**
   * Total active energy on phase C, Wh.
   */
  @characteristic
  readonly c_total_act_energy: number = 0;

  /**
   * Total active returned energy on phase C, Wh.
   */
  @characteristic
  readonly c_total_act_ret_energy: number = 0;

  /**
   * Total active energy on all phases, Wh.
   */
  @characteristic
  readonly total_act: number = 0;

  /**
   * Total active returned energy on all phases, Wh.
   */
  @characteristic
  readonly total_act_ret: number = 0;

  /**
   * EM component error conditions. May contain power_meter_failure, phase_sequence, or ct_type_not_set.
   * Present in status only if not empty.
   */
  @characteristic
  readonly errors: string[] | undefined;

  constructor(device: Device, id = 0) {
    super('EmData', device, id);
  }

  /**
   * @param ts - UNIX timestamp of the first interval. Used for selecting the next data chunk when the response is too large
   *             to fit in one call.
   */
  getRecords(ts?: number): PromiseLike<EmDataGetRecordsResponse> {
    return this.rpc<EmDataGetRecordsResponse>('GetRecords', {
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
  getData(ts: number, end_ts?: number, add_keys?: boolean): PromiseLike<EmDataGetDataResponse> {
    return this.rpc<EmDataGetDataResponse>('GetData', {
      id: this.id,
      ts,
      end_ts,
      add_keys,
    });
  }

  deleteAllData(): PromiseLike<null> {
    return this.rpc<null>('DeleteAllData', {
      id: this.id,
    });
  }

  resetCounters(): PromiseLike<null> {
    return this.rpc<null>('ResetCounters', {
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
  getNetEnergies(ts: number, period: number, end_ts?: number, add_keys?: boolean): PromiseLike<null> {
    return this.rpc<null>('GetNetEnergies', {
      id: this.id,
      ts,
      end_ts,
      period,
      add_keys,
    });
  }

  handleEvent(event: RpcEvent) {
    switch (event.event) {
      case 'data':
        this.emit('data', event.data);
        break;

      default:
        super.handleEvent(event);
    }
  }
}
