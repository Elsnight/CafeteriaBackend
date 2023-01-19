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
exports.ValidadorAgregarProducto = exports.AgregarProducto = void 0;
const fluent_ts_validator_1 = require("fluent-ts-validator");
const error_1 = require("../../comunes/expeciones/error");
const producto_1 = require("../../dominio/entidades/producto");
class AgregarProducto {
    constructor(dependecias) {
        this.contexto = dependecias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validarCampos(request);
            const producto = yield this.contexto.Producto.create(new producto_1.Producto(request.nombre, request.precio, request.stock));
            return {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                fechaCreacion: producto.fechaCreacion
            };
        });
    }
    validarCampos(request) {
        const resultado = new ValidadorAgregarProducto().validate(request);
        if (resultado.isInvalid()) {
            throw new error_1.ErrorServer('Campos incorrectos!', 400, resultado.getFailureMessages());
        }
    }
}
exports.AgregarProducto = AgregarProducto;
class ValidadorAgregarProducto extends fluent_ts_validator_1.AbstractValidator {
    constructor() {
        super();
        this.validateIfString(x => x.nombre)
            .isNotEmpty()
            .withFailureMessage("El nombre no es válido");
        this.validateIfNumber(x => x.precio)
            .isNotEmpty()
            .isGreaterThan(0)
            .withFailureMessage('El precio no es válido!');
        this.validateIfNumber(x => x.stock)
            .isNotEmpty()
            .isGreaterThan(0)
            .withFailureMessage('El stock no es válido!');
    }
}
exports.ValidadorAgregarProducto = ValidadorAgregarProducto;
