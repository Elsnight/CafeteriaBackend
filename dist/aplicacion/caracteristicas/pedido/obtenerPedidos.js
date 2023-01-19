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
exports.ObtenerPedidos = void 0;
class ObtenerPedidos {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.rol == 'cliente') {
                return yield this.contexto.Pedido.find({ _cliente: request.id })
                    .populate('_cliente')
                    .populate('productos._producto')
                    .populate('componentes._componente');
            }
            if (request.rol == 'cocinero') {
                return yield this.contexto.Pedido.find({ _cocinero: request.id })
                    .populate('_cliente')
                    .populate('productos._producto')
                    .populate('componentes._componente');
            }
            return yield this.contexto.Pedido.find()
                .populate('_cliente')
                .populate('productos._producto')
                .populate('componentes._componente');
        });
    }
}
exports.ObtenerPedidos = ObtenerPedidos;
