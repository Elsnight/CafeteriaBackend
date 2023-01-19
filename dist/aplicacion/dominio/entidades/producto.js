"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
class Producto {
    constructor(nombre, precio, stock) {
        this.id = (0, uuid_1.v4)();
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.fechaCreacion = new Date((0, moment_1.default)().utc().format());
    }
}
exports.Producto = Producto;
