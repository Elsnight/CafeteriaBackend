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
exports.ActualizarEstadoPedido = void 0;
class ActualizarEstadoPedido {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedido = yield this.contexto.Pedido.findById(request.id);
            pedido === null || pedido === void 0 ? void 0 : pedido.estado.push(request.estado);
            if (request.estado == 'verificado') {
                pedido._cocinero = request.cocinero;
            }
            pedido === null || pedido === void 0 ? void 0 : pedido.save();
            return pedido;
        });
    }
}
exports.ActualizarEstadoPedido = ActualizarEstadoPedido;
