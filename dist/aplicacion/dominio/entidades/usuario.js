"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
class Usuario {
    constructor(nombre, apellido, telefono, email, password, rol, urlFoto, fechaCreacion) {
        this.id = (0, uuid_1.v4)();
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.urlFoto = urlFoto !== null && urlFoto !== void 0 ? urlFoto : null;
        this.fechaCreacion = fechaCreacion !== null && fechaCreacion !== void 0 ? fechaCreacion : new Date((0, moment_1.default)().utc().format());
    }
}
exports.Usuario = Usuario;
