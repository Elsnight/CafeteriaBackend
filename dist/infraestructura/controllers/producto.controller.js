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
exports.ProductoController = void 0;
const verificarRol_1 = require("../helpers/verificarRol");
const error_1 = require("../error");
class ProductoController {
    constructor(depedencias) {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador", "cliente"];
                const usuario = yield this.verificarToken.ejecutar(req.headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.obtenerProductos.ejecutar();
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.create = ({ headers, body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.agregarProducto.ejecutar(body);
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.delete = ({ headers, params }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.eliminarProducto.ejecutar(params.id);
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.update = ({ headers, body, params }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesPermitidos = ["administrador"];
                const usuario = yield this.verificarToken.ejecutar(headers);
                (0, verificarRol_1.verificarRol)(usuario.rol, rolesPermitidos);
                const data = yield this.actualizar.ejecutar(Object.assign(Object.assign({}, body), { id: params.id }));
                res.json(data);
            }
            catch (error) {
                (0, error_1.ejecutarError)(res, error);
            }
        });
        this.obtenerProductos = depedencias.obtenerProductos;
        this.verificarToken = depedencias.verificarToken;
        this.agregarProducto = depedencias.agregarProducto;
        this.eliminarProducto = depedencias.eliminarProducto;
        this.actualizar = depedencias.actualizarProducto;
    }
}
exports.ProductoController = ProductoController;
