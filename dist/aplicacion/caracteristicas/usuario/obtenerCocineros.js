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
exports.ObtenerCocineros = void 0;
class ObtenerCocineros {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar() {
        return __awaiter(this, void 0, void 0, function* () {
            const cocineros = yield this.contexto.Usuario.find({
                rol: {
                    '$in': ['cocinero']
                }
            });
            let data = [];
            for (let i = 0; i < cocineros.length; i++) {
                let pedidosPendientes = 0;
                let pedidos = yield this.contexto.Pedido.find({ _cocinero: cocineros[i]._id });
                pedidos.forEach(x => {
                    if (x.estado[x.estado.length - 1] == 'verificado') {
                        pedidosPendientes++;
                    }
                });
                const { _id, nombre, apellido } = cocineros[i];
                data.push({
                    pedidosPendientes,
                    _id,
                    nombre,
                    apellido
                });
            }
            return data;
        });
    }
}
exports.ObtenerCocineros = ObtenerCocineros;
