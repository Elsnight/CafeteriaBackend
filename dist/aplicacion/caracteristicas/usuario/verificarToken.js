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
exports.ValidadorVerificarToken = exports.VerificarToken = void 0;
const fluent_ts_validator_1 = require("fluent-ts-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../infraestructura/config");
const error_1 = require("../../comunes/expeciones/error");
class VerificarToken {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validar(request);
            const decodificado = this.validarToken(request);
            if (!decodificado.id)
                throw new error_1.ErrorServer("El token no esta codificado correctamente!");
            const usuario = yield this.contexto.Usuario.findOne({ id: decodificado.id });
            if (!usuario)
                throw new error_1.ErrorServer('El token no coincide con ningún usuario!');
            return this.getDTO(usuario, request.token);
        });
    }
    validar(comando) {
        this.validarCampos(comando);
    }
    validarCampos(comando) {
        const respuesta = new ValidadorVerificarToken().validate(comando);
        if (respuesta.isInvalid()) {
            throw new error_1.ErrorServer(respuesta.getFailureMessages().pop());
        }
    }
    validarToken(comando) {
        try {
            const decodificado = (0, jsonwebtoken_1.verify)(comando.token, config_1.SECRET);
            return decodificado;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError)
                throw new error_1.ErrorServer("El token ha expirado!");
            if (error instanceof jsonwebtoken_1.JsonWebTokenError)
                throw new error_1.ErrorServer("El token no tiene el formato correcto!");
            throw new error_1.ErrorServer(error.message);
        }
    }
    getDTO(usuario, token) {
        return {
            _id: usuario._id,
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            email: usuario.email,
            rol: usuario.rol,
            urlFoto: usuario.urlFoto,
            fechaCreacion: usuario.fechaCreacion,
            token
        };
    }
}
exports.VerificarToken = VerificarToken;
class ValidadorVerificarToken extends fluent_ts_validator_1.AbstractValidator {
    constructor() {
        super();
        this.validateIfString(x => x.token)
            .isNotEmpty()
            .withFailureMessage('El token no puede estar vacío!');
    }
}
exports.ValidadorVerificarToken = ValidadorVerificarToken;
