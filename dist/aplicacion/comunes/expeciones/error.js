"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorServer = void 0;
class ErrorServer extends Error {
    constructor(message, status, errors) {
        super(message || 'Error en el servidor!');
        this.errors = errors !== null && errors !== void 0 ? errors : [];
        this.status = 400;
    }
}
exports.ErrorServer = ErrorServer;
