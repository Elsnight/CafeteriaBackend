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
exports.ValidadorLogin = exports.Login = void 0;
const fluent_ts_validator_1 = require("fluent-ts-validator");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const error_1 = require("../../comunes/expeciones/error");
const config_1 = require("../../../infraestructura/config");
class Login {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validarCampos(request);
            const usuario = yield this.contexto.Usuario.findOne({ email: request.email });
            if (!usuario)
                throw new error_1.ErrorServer('Credenciales incorrectas!');
            const resultado = yield (0, bcrypt_1.compare)(request.password, usuario.password);
            if (!resultado) {
                throw new error_1.ErrorServer('Credenciales incorrectas!');
            }
            return this.getDTO(usuario);
        });
    }
    validarCampos(comando) {
        const respuesta = new ValidadorLogin().validate(comando);
        if (respuesta.isInvalid()) {
            throw new error_1.ErrorServer('Campos incorrectos!', 400, respuesta.getFailureMessages());
        }
    }
    generarToken(id) {
        const token = (0, jsonwebtoken_1.sign)({ id }, config_1.SECRET, {
            expiresIn: '7d'
        });
        return token;
    }
    getDTO(usuario) {
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
            token: this.generarToken(usuario.id)
        };
    }
}
exports.Login = Login;
class ValidadorLogin extends fluent_ts_validator_1.AbstractValidator {
    constructor() {
        super();
        this.validateIfString(x => x.email)
            .isNotEmpty()
            .isEmail()
            .withFailureMessage('El email no es válido!');
        this.validateIfString(x => x.password)
            .isNotEmpty()
            .hasMinLength(8)
            .withFailureMessage('El password no es válido!');
    }
}
exports.ValidadorLogin = ValidadorLogin;
