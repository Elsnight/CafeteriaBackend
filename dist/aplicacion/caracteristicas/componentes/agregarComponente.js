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
exports.ValidadorAgregarComponente = exports.AgregarComponente = void 0;
const fluent_ts_validator_1 = require("fluent-ts-validator");
const error_1 = require("../../comunes/expeciones/error");
const componente_1 = require("../../dominio/entidades/componente");
class AgregarComponente {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
        this.servicioArchivo = dependencias.servicioArchivo;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validarCampos(request);
            const { nombre, descripcion, precio, base64Foto, medida, tipo } = request;
            const componente = new componente_1.Componente(nombre, descripcion, precio, medida, tipo);
            if (base64Foto) {
                componente.urlFoto = yield this.servicioArchivo.subir(base64Foto);
            }
            const componenteNuevo = yield this.contexto.Componente.create(componente);
            return {
                id: componenteNuevo.id,
                nombre: componenteNuevo.nombre,
                descripcion: componenteNuevo.descripcion,
                precio: componenteNuevo.precio,
                medida: componenteNuevo.medida,
                tipo: componenteNuevo.tipo,
                urlFoto: componenteNuevo.urlFoto,
                fechaCreacion: componenteNuevo.fechaCreacion
            };
        });
    }
    validarCampos(request) {
        const resultado = new ValidadorAgregarComponente().validate(request);
        if (resultado.isInvalid()) {
            throw new error_1.ErrorServer('Campos incorrectos!', 400, resultado.getFailureMessages());
        }
    }
}
exports.AgregarComponente = AgregarComponente;
class ValidadorAgregarComponente extends fluent_ts_validator_1.AbstractValidator {
    constructor() {
        super();
        this.validateIfString(x => x.nombre)
            .isNotEmpty()
            .withFailureMessage("El nombre no es válido");
        this.validateIfString(x => x.descripcion)
            .isNotEmpty()
            .withFailureMessage("La descripcion no es válido");
        this.validateIfNumber(x => x.precio)
            .isNotEmpty()
            .isGreaterThan(0)
            .withFailureMessage('El precio no es válido!');
        this.validateIfString(x => x.medida)
            .isNotEmpty()
            .withFailureMessage("La medida no es válido");
        this.validateIfString(x => x.tipo)
            .isNotEmpty()
            .withFailureMessage("El tipo no es válido");
    }
}
exports.ValidadorAgregarComponente = ValidadorAgregarComponente;
