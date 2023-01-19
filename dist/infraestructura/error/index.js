"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejecutarError = void 0;
const ejecutarError = (res, error) => {
    var _a, _b;
    res.status((_a = error.status) !== null && _a !== void 0 ? _a : 402)
        .json(Object.assign({ message: (_b = error.message) !== null && _b !== void 0 ? _b : 'Error en el servidor!' }, error));
};
exports.ejecutarError = ejecutarError;
