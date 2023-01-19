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
exports.ActualizarUsuario = void 0;
const bcrypt_1 = require("bcrypt");
const error_1 = require("../../comunes/expeciones/error");
class ActualizarUsuario {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
        this.servicioArchivo = dependencias.servicioArchivo;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.contexto.Usuario.findById(request.id);
            if (!usuario) {
                throw new error_1.ErrorServer('El id no existe!');
            }
            if (request.fotoBase64) {
                usuario.urlFoto = (yield this.servicioArchivo.subir(request.fotoBase64));
            }
            if (request.password) {
                usuario.password = yield this.encriptarPassword(request.password);
            }
            if (request.telefono) {
                usuario.telefono = request.telefono;
            }
            usuario.save();
            return usuario;
        });
    }
    encriptarPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)(10);
            return yield (0, bcrypt_1.hash)(password, salt);
        });
    }
}
exports.ActualizarUsuario = ActualizarUsuario;
