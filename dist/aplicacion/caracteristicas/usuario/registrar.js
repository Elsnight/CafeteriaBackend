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
exports.ValidadorRegistro = exports.Registrar = void 0;
const bcrypt_1 = require("bcrypt");
const fluent_ts_validator_1 = require("fluent-ts-validator");
const usuario_1 = require("../../dominio/entidades/usuario");
const error_1 = require("../../comunes/expeciones/error");
class Registrar {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
        this.servicioArchivo = dependencias.servicioArchivo;
    }
    ejecutar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validar(usuario);
            const nuevoUsuario = new usuario_1.Usuario(usuario.nombre, usuario.apellido, usuario.telefono, usuario.email, usuario.password, usuario.rol);
            nuevoUsuario.password = yield this.encriptarPassword(nuevoUsuario.password);
            if (usuario.fotoBase64) {
                nuevoUsuario.urlFoto = yield this.servicioArchivo.subir(usuario.fotoBase64);
            }
            const usuarioCreado = yield this.contexto.Usuario.create(nuevoUsuario);
            return this.getDTO(usuarioCreado);
        });
    }
    encriptarPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)(10);
            return yield (0, bcrypt_1.hash)(password, salt);
        });
    }
    validar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validarCampos(usuario);
            yield this.validarExitenciaEmail(usuario.email);
            if (usuario.rol == 'administrador')
                yield this.validarQueNoExistaUnAdmin();
        });
    }
    validarCampos(usuario) {
        const resultado = new ValidadorRegistro().validate(usuario);
        if (resultado.isInvalid()) {
            throw new error_1.ErrorServer('Campos incorrectos!', 400, resultado.getFailureMessages());
        }
    }
    validarExitenciaEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield this.contexto.Usuario.find({ email });
            if (resultado.length != 0) {
                throw new error_1.ErrorServer('El email ya está registrado!');
            }
        });
    }
    validarQueNoExistaUnAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield this.contexto.Usuario.find({ rol: 'administrador' });
            if (resultado.length != 0) {
                throw new error_1.ErrorServer('Ya existe un administrador registrado!');
            }
        });
    }
    getDTO(usuario) {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            email: usuario.email,
            rol: usuario.rol,
            fechaCreacion: usuario.fechaCreacion,
            urlFoto: usuario.urlFoto
        };
    }
}
exports.Registrar = Registrar;
class ValidadorRegistro extends fluent_ts_validator_1.AbstractValidator {
    constructor() {
        super();
        this.validateIfString(x => x.nombre)
            .isNotEmpty()
            .hasLengthBetween(2, 50)
            .withFailureMessage("El nombre no es válido");
        this.validateIfString(x => x.apellido)
            .isNotEmpty()
            .hasLengthBetween(2, 50)
            .withFailureMessage('El apellido no es válido');
        this.validateIfString(x => x.telefono)
            .isNotEmpty()
            .isNumericString()
            .withFailureMessage('El telefono no es válido');
        this.validateIfString(x => x.email)
            .isNotEmpty()
            .isEmail()
            .withFailureMessage('El email no es válido');
        this.validateIfString(x => x.password)
            .isNotEmpty()
            .hasMinLength(8)
            .withFailureMessage('El password no es válido');
        this.validateIfString(x => x.rol)
            .isNotEmpty()
            .isIn(['cliente', 'administrador'])
            .withFailureMessage('El rol no es válido');
    }
}
exports.ValidadorRegistro = ValidadorRegistro;
