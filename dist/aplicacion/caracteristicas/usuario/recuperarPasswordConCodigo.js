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
exports.RecuperarPasswordConCodigo = void 0;
const bcrypt_1 = require("bcrypt");
const error_1 = require("../../comunes/expeciones/error");
class RecuperarPasswordConCodigo {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.email) {
                throw new error_1.ErrorServer('Debe enviar el email!');
            }
            if (!request.codigo) {
                throw new error_1.ErrorServer('Debe enviar el codigo!');
            }
            if (!request.password) {
                throw new error_1.ErrorServer('Debe enviar el password!');
            }
            if (request.password.length < 8) {
                throw new error_1.ErrorServer('El password debe tener al menos 8 caracteres!');
            }
            const usuario = yield this.contexto.Usuario.findOne({ email: request.email });
            if (!usuario) {
                throw new error_1.ErrorServer('El email no existe!');
            }
            if (usuario.codigo != request.codigo) {
                throw new error_1.ErrorServer('El código es incorrecto!');
            }
            usuario.codigo = this.generarCodigo();
            usuario.password = yield this.encriptarPassword(request.password.toString());
            yield usuario.save();
            return usuario;
        });
    }
    generarCodigo() {
        let codigo = "";
        for (let i = 0; i < 6; i++) {
            codigo += Math.floor(Math.random() * 9 + 1);
        }
        return codigo;
    }
    encriptarPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)(10);
            return yield (0, bcrypt_1.hash)(password, salt);
        });
    }
}
exports.RecuperarPasswordConCodigo = RecuperarPasswordConCodigo;
