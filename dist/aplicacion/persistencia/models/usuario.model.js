"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioModel = void 0;
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    id: String,
    nombre: String,
    apellido: String,
    telefono: String,
    email: String,
    password: String,
    rol: {
        type: String,
        enum: ['administrador', 'cliente', 'cocinero']
    },
    urlFoto: {
        type: String,
        default: null
    },
    codigo: {
        type: String,
        default: null
    },
    fechaCreacion: Date
});
exports.usuarioModel = (0, mongoose_1.model)('usuarios', UsuarioSchema);
