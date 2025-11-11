import { characteristic, ComponentWithId } from './base';
import { Device } from '../devices';
import { RpcEvent } from '../rpc';

export interface InputCountsAttributes {
  total: number;
  xtotal: number | null;
  by_minute: number[];
  xby_minute: number[];
  minute_ts: number;
}

export interface InputAttributes {
  id: number;
  state?: boolean | null;
  percent?: number | null;
  xpercent?: number | null;
  counts?: InputCountsAttributes;
  freq?: number;
  xfreq?: number | null;
  errors?: string[];
}

export interface InputXpercentConfig {
  expr: string | null;
  unit: string | null;
}

export interface InputXcountsConfig {
  expr: string | null;
  unit: string | null;
}

export interface InputXfreqConfig {
  expr: string | null;
  unit: string | null;
}

export interface InputConfig {
  id: number;
  name: string | null;
  type: 'switch' | 'button' | 'analog' | 'count';
  enable: boolean;
  invert: boolean;
  factory_reset?: boolean;
  report_thr?: number;
  range_map?: number[];
  range?: number;
  xpercent?: InputXpercentConfig;
  count_rep_thr?: number;
  freq_window?: number;
  freq_rep_thr?: number;
  xcounts?: InputXcountsConfig;
  xfreq?: InputXfreqConfig;
}

/**
 * The Input component handles the external digital or analog input terminals of a device.
 */
export class Input extends ComponentWithId<InputAttributes, InputConfig> implements InputAttributes {
  /**
   * State of the input (null if the input instance is stateless, i.e., for type button).
   * (only for type switch, button)
   */
  @characteristic
  readonly state?: boolean | null;

  /**
   * Analog value in percent (null if the valid value could not be obtained).
   * (only for type analog)
   */
  @characteristic
  readonly percent?: number | null;

  /**
   * Percent transformed with config.xpercent.expr. Present only when both config.xpercent.expr and config.xpercent.unit
   * are set to non-empty values. null if config.xpercent.expr cannot be evaluated.
   * (only for type analog)
   */
  @characteristic
  readonly xpercent?: number | null;

  /**
   * Information about the counted pulses.
   * (only for type count)
   */
  @characteristic
  readonly counts?: InputCountsAttributes;

  /**
   * Measured frequency in Hz. Determined at every elapsed freq_window period.
   * (only for type count)
   */
  @characteristic
  readonly freq?: number;

  /**
   * freq transformed with config.xfreq.expr. Present only when both config.xfreq.expr and config.xfreq.unit
   * are set to non-empty values. null if config.xfreq.expr cannot be evaluated.
   * (only for type count)
   */
  @characteristic
  readonly xfreq?: number | null;

  /**
   * Shown only if at least one error is present. May contain out_of_range, read.
   */
  @characteristic
  readonly errors?: string[];

  constructor(device: Device, id = 0) {
    super('Input', device, id);
  }

  handleEvent(event: RpcEvent) {
    switch (event.event) {
      case 'btn_down':
        this.emit('buttonDown');
        break;

      case 'btn_up':
        this.emit('buttonUp');
        break;

      case 'single_push':
        this.emit('singlePush');
        break;

      case 'double_push':
        this.emit('doublePush');
        break;

      case 'triple_push':
        this.emit('triplePush');
        break;

      case 'long_push':
        this.emit('longPush');
        break;

      default:
        super.handleEvent(event);
    }
  }

  /**
   * Emit input events on demand without an actual change on the physical inputs
   * (only for type button)
   * @param event_type - Event to be emitted, one of: btn_down, btn_up, single_push, double_push, triple_push and long_push.
   */
  trigger(event_type: 'btn_down' | 'btn_up' | 'single_push' | 'double_push' | 'triple_push and long_push'): PromiseLike<null> {
    return this.rpc<null>('Trigger', {
      id: this.id,
      event_type,
    });
  }

  /**
   * This method resets associated counters.
   * @param type - Array of strings, selects which counter to reset.
   */
  resetCounters(type?: string[]): PromiseLike<null> {
    return this.rpc<null>('ResetCounters', {
      id: this.id,
      type,
    });
  }
}
