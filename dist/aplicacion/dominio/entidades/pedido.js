"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const moment_1 = __importDefault(require("moment"));
class Pedido {
    constructor(total, urlComprobante, _cliente, componentes, productos) {
        this.total = total;
        this.componentes = componentes;
        this.productos = productos;
        this.urlComprobante = urlComprobante;
        this._cliente = _cliente;
        this.estado = ["pendiente"];
        this.fechaCreacion = new Date((0, moment_1.default)().utc().format());
    }
}
exports.Pedido = Pedido;
