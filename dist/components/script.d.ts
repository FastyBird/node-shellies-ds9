import { ComponentBase } from './base';
import { Device } from '../devices';
export interface ScriptAttributes {
    id: number;
    running: boolean;
    mem_used: number;
    mem_peak: number;
    mem_free: number;
    cpu?: number;
    errors?: string[];
}
export interface ScriptConfig {
    id: number;
    name: string;
    enable: boolean;
}
export interface ScriptConfigResponse {
    restart_required: boolean;
}
export interface ScriptList {
    scripts: Array<{
        id: number;
        name: string;
        enable: boolean;
        running: boolean;
    }>;
}
export interface ScriptCreateResponse {
    id: number;
}
export interface ScriptStartStopResponse {
    was_running: boolean;
}
export interface ScriptPutCodeResponse {
    len: number;
}
export interface ScriptGetCodeResponse {
    data: string;
    left: number;
}
export interface ScriptEvalResponse {
    result: string;
}
/**
 * The Script component handles management of scripts on the device.
 */
export declare class Script extends ComponentBase {
    constructor(device: Device);
    /**
     * Retrieves the status of a script.
     *
     * @param id - The script ID.
     */
    getStatus(id: number): PromiseLike<ScriptAttributes>;
    /**
     * Retrieves the configuration of a script.
     *
     * @param id - The script ID.
     */
    getConfig(id: number): PromiseLike<ScriptConfig>;
    /**
     * Requests changes in the configuration of a script.
     *
     * @param id - The script ID.
     * @param config - The configuration options to set.
     */
    setConfig(id: number, config: Partial<ScriptConfig>): PromiseLike<ScriptConfigResponse>;
    /**
     * Lists all scripts.
     */
    list(): PromiseLike<ScriptList>;
    /**
     * Creates a new script.
     *
     * @param name - The name of the script.
     */
    create(name: string): PromiseLike<ScriptCreateResponse>;
    /**
     * Removes a script.
     *
     * @param id - The script ID.
     */
    delete(id: number): PromiseLike<null>;
    /**
     * Runs a script.
     *
     * @param id - The script ID.
     */
    start(id: number): PromiseLike<ScriptStartStopResponse>;
    /**
     * Stops the execution of a script.
     *
     * @param id - The script ID.
     */
    stop(id: number): PromiseLike<ScriptStartStopResponse>;
    /**
     * Uploads code to a script.
     *
     * @param id - The script ID.
     * @param code - The code to upload.
     * @param append - Whether the code should be appended to the script or overwrite any existing code.
     */
    putCode(id: number, code: string, append?: boolean): PromiseLike<ScriptPutCodeResponse>;
    /**
     * Downloads code from a script.
     *
     * @param id - The script ID.
     * @param offset - The byte offset from the beginning.
     * @param len - The number of bytes to download.
     */
    getCode(id: number, offset?: number, len?: number): PromiseLike<ScriptGetCodeResponse>;
    /**
     * Evaluates or executes code inside of a script.
     *
     * @param id - The script ID.
     * @param code - The code to evaluate.
     */
    eval(id: number, code: string): PromiseLike<ScriptEvalResponse>;
}
//# sourceMappingURL=script.d.ts.map