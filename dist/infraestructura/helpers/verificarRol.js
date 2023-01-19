"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarRol = void 0;
const error_1 = require("../../aplicacion/comunes/expeciones/error");
const verificarRol = (rol, rolesPermitidos) => {
    if (rolesPermitidos.indexOf(rol) == -1) {
        throw new error_1.ErrorServer(`El rol ${rol} no tiene permitido realizar esta acción!`);
    }
};
exports.verificarRol = verificarRol;
