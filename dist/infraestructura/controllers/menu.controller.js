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
exports.MenuController = void 0;
const verificarRol_1 = require("../helpers/verificarRol");
const error_1 = require("../error");
class MenuController {
    constructor(dependencias) {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.verificarToken.ejecutar(req.headers);
                const data = yield this.obtenerMenus.ejecutar();
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(req.headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.agregarMenu.ejecutar(req.body);
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(req.headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.eliminarMenu.ejecutar(req.params.id);
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.updateState = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador", 'cocinero'];
                const usuario = yield this.verificarToken.ejecutar(req.headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.actualizarEstado.ejecutar(req.body);
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.obtenerMenus = dependencias.obtenerMenus;
        this.verificarToken = dependencias.verificarToken;
        this.agregarMenu = dependencias.agregarMenu;
        this.eliminarMenu = dependencias.eliminarMenu;
        this.actualizarEstado = dependencias.actualizarEstadoMenu;
    }
}
exports.MenuController = MenuController;
