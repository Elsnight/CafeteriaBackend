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
exports.ComponenteController = void 0;
const verificarRol_1 = require("../helpers/verificarRol");
const error_1 = require("../error");
class ComponenteController {
    constructor(depedencias) {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(req.headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.obtenerComponentes.ejecutar();
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.create = ({ body, headers }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.agregarComponente.ejecutar(body);
                res.json(data);
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
                const data = yield this.eliminarComponente.ejecutar(params.id);
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.update = ({ params, body, headers }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.actualizarComponente.ejecutar(Object.assign(Object.assign({}, body), { id: params.id }));
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.obtenerComponentes = depedencias.obtenerComponentes;
        this.verificarToken = depedencias.verificarToken;
        this.agregarComponente = depedencias.agregarComponente;
        this.eliminarComponente = depedencias.eliminarComponente;
        this.actualizarComponente = depedencias.actualizarComponente;
    }
}
exports.ComponenteController = ComponenteController;
