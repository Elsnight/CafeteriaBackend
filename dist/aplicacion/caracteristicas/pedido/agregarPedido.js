"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregarPedido = void 0;
const pedido_1 = require("../../dominio/entidades/pedido");
const error_1 = require("../../comunes/expeciones/error");
class AgregarPedido {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
        this.servicioArchivo = dependencias.servicioArchivo;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlComprobante = yield this.servicioArchivo.subir(request.base64Comprobante);
            if (!urlComprobante) {
                throw new error_1.ErrorServer('Debe envíar la foto del comprobante');
            }
            const pedido = new pedido_1.Pedido(request.total, urlComprobante, request._cliente, request.componentes, request.productos);
            pedido.productos.forEach((x) => __awaiter(this, void 0, void 0, function* () {
                const producto = yield this.contexto.Producto.findById(x._producto);
                producto.stock -= x.cantidad;
                yield producto.save();
            }));
            const nuevoPedido = yield this.contexto.Pedido.create(pedido);
            return nuevoPedido;
        });
    }
}
exports.AgregarPedido = AgregarPedido;
