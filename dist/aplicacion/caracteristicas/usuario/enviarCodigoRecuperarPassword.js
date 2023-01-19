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
exports.EnviarCodigoRecuperarPassword = void 0;
const error_1 = require("../../comunes/expeciones/error");
class EnviarCodigoRecuperarPassword {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
        this.servicioEmail = dependencias.servicioEmail;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.contexto.Usuario.findOne({ email: request.email });
            if (!usuario) {
                throw new error_1.ErrorServer('Datos incorrectos!');
            }
            usuario.codigo = this.generarCodigo();
            yield this.servicioEmail.enviarEmail(request.email, `<h2>Código para recuperar la contraseña</h2>
      <br>
      <p>Código: <strong>${usuario.codigo}</strong></p>`, 'Recuperar contraseña');
            yield usuario.save();
            return {
                email: request.email
            };
        });
    }
    generarCodigo() {
        let codigo = "";
        for (let i = 0; i < 6; i++) {
            codigo += Math.floor(Math.random() * 9 + 1);
        }
        return codigo;
    }
}
exports.EnviarCodigoRecuperarPassword = EnviarCodigoRecuperarPassword;
