"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const base_1 = require("./base");
/**
 * The Script component handles management of scripts on the device.
 */
class Script extends base_1.ComponentBase {
    constructor(device) {
        super('Script', device);
    }
    /**
     * Retrieves the status of a script.
     *
     * @param id - The script ID.
     */
    getStatus(id) {
        return this.rpc('GetStatus', {
            id,
        });
    }
    /**
     * Retrieves the configuration of a script.
     *
     * @param id - The script ID.
     */
    getConfig(id) {
        return this.rpc('GetConfig', {
            id,
        });
    }
    /**
     * Requests changes in the configuration of a script.
     *
     * @param id - The script ID.
     * @param config - The configuration options to set.
     */
    setConfig(id, config) {
        return this.rpc('SetConfig', {
            id,
            config,
        });
    }
    /**
     * Lists all scripts.
     */
    list() {
        return this.rpc('List');
    }
    /**
     * Creates a new script.
     *
     * @param name - The name of the script.
     */
    create(name) {
        return this.rpc('Create', {
            name,
        });
    }
    /**
     * Removes a script.
     *
     * @param id - The script ID.
     */
    delete(id) {
        return this.rpc('Delete', {
            id,
        });
    }
    /**
     * Runs a script.
     *
     * @param id - The script ID.
     */
    start(id) {
        return this.rpc('Start', {
            id,
        });
    }
    /**
     * Stops the execution of a script.
     *
     * @param id - The script ID.
     */
    stop(id) {
        return this.rpc('Stop', {
            id,
        });
    }
    /**
     * Uploads code to a script.
     *
     * @param id - The script ID.
     * @param code - The code to upload.
     * @param append - Whether the code should be appended to the script or overwrite any existing code.
     */
    putCode(id, code, append = false) {
        return this.rpc('PutCode', {
            id,
            code,
            append,
        });
    }
    /**
     * Downloads code from a script.
     *
     * @param id - The script ID.
     * @param offset - The byte offset from the beginning.
     * @param len - The number of bytes to download.
     */
    getCode(id, offset = 0, len) {
        return this.rpc('GetCode', {
            id,
            offset,
            len,
        });
    }
    /**
     * Evaluates or executes code inside of a script.
     *
     * @param id - The script ID.
     * @param code - The code to evaluate.
     */
    eval(id, code) {
        return this.rpc('Eval', {
            id,
            code,
        });
    }
}
exports.Script = Script;
//# sourceMappingURL=script.js.map