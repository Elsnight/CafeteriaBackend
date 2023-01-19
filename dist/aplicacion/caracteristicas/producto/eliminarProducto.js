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
exports.EliminarProducto = void 0;
const error_1 = require("../../comunes/expeciones/error");
class EliminarProducto {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield this.contexto.Producto.findOneAndDelete({ id });
            if (!producto)
                throw new error_1.ErrorServer("El id no existe!");
            return {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                fechaCreacion: producto.fechaCreacion
            };
        });
    }
}
exports.EliminarProducto = EliminarProducto;
