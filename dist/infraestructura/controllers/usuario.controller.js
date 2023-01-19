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
exports.UsuarioController = void 0;
const error_1 = require("../error");
const verificarRol_1 = require("../helpers/verificarRol");
class UsuarioController {
    constructor(dependencias) {
        this.getCollaborators = ({ headers }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.obtenerColaboradores.ejecutar();
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.create = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.registrar.ejecutar(body);
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.signIn = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.login.ejecutar(body);
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.verifyToken = ({ headers }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.verificarToken.ejecutar(headers);
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.createCollaborator = ({ headers, body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.crearColaborador.ejecutar(body);
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.sendCodeRecoveryPassword = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.enviarCodigoRecuperarPassword.ejecutar(body);
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.recoveryPassword = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.recuperarPasswordConCodigo.ejecutar(body);
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.delete = ({ params, headers }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.eliminarColaborador.ejecutar({ id: params.id });
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.getConcineros = ({ params, headers }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.obtenerCocineros.ejecutar();
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.update = ({ body, headers }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.verificarToken.ejecutar(headers);
                const data = yield this.actualizarUsuario.ejecutar(Object.assign({ id: usuario._id }, body));
                return res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.obtenerColaboradores = dependencias.obtenerColaboradores;
        this.registrar = dependencias.registrar;
        this.login = dependencias.login;
        this.verificarToken = dependencias.verificarToken;
        this.crearColaborador = dependencias.crearColaborador;
        this.enviarCodigoRecuperarPassword = dependencias.enviarCodigoRecuperarPassword;
        this.recuperarPasswordConCodigo = dependencias.recuperarPasswordConCodigo;
        this.eliminarColaborador = dependencias.eliminarColaborador;
        this.obtenerCocineros = dependencias.obtenerCocineros;
        this.actualizarUsuario = dependencias.actualizarUsuario;
    }
}
exports.UsuarioController = UsuarioController;
