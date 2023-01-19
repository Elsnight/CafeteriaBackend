"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Componente = void 0;
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
//type Tipo = 'bebida' | 'caldo' | 'segundo' | 'extra';
class Componente {
    constructor(nombre, descripcion, precio, medida, tipo, urlFoto) {
        this.id = (0, uuid_1.v4)();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.medida = medida;
        this.tipo = tipo;
        this.urlFoto = urlFoto !== null && urlFoto !== void 0 ? urlFoto : null;
        this.fechaCreacion = new Date((0, moment_1.default)().utc().format());
    }
}
exports.Componente = Componente;
