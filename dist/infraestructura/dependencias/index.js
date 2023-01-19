"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contenedor = void 0;
const awilix = __importStar(require("awilix"));
const obtenerColaboradores_1 = require("../../aplicacion/caracteristicas/usuario/obtenerColaboradores");
const registrar_1 = require("../../aplicacion/caracteristicas/usuario/registrar");
const login_1 = require("../../aplicacion/caracteristicas/usuario/login");
const contexto_1 = require("../../aplicacion/persistencia/contexto");
const usuario_controller_1 = require("../controllers/usuario.controller");
const verificarToken_1 = require("../../aplicacion/caracteristicas/usuario/verificarToken");
const crearColaborador_1 = require("../../aplicacion/caracteristicas/usuario/crearColaborador");
const ServicioCloudinaryArchivo_1 = require("../../aplicacion/servicios/ServicioCloudinaryArchivo");
const producto_1 = require("../../aplicacion/caracteristicas/producto");
const componentes_1 = require("../../aplicacion/caracteristicas/componentes");
const menu_1 = require("../../aplicacion/caracteristicas/menu");
const controllers_1 = require("../controllers");
const pedido_1 = require("../../aplicacion/caracteristicas/pedido");
const ServicioEmail_1 = require("../../aplicacion/servicios/ServicioEmail");
const enviarCodigoRecuperarPassword_1 = require("../../aplicacion/caracteristicas/usuario/enviarCodigoRecuperarPassword");
const recuperarPasswordConCodigo_1 = require("../../aplicacion/caracteristicas/usuario/recuperarPasswordConCodigo");
const eliminarColaborador_1 = require("../../aplicacion/caracteristicas/usuario/eliminarColaborador");
const obtenerCocineros_1 = require("../../aplicacion/caracteristicas/usuario/obtenerCocineros");
const actualizarUsuario_1 = require("../../aplicacion/caracteristicas/usuario/actualizarUsuario");
exports.contenedor = awilix.createContainer();
exports.contenedor.register({
    contexto: awilix.asClass(contexto_1.Contexto),
    servicioArchivo: awilix.asClass(ServicioCloudinaryArchivo_1.ServicioCloudinaryArchivo),
    servicioEmail: awilix.asClass(ServicioEmail_1.ServicioEmail),
    obtenerColaboradores: awilix.asClass(obtenerColaboradores_1.ObtenerColaboradores),
    registrar: awilix.asClass(registrar_1.Registrar),
    login: awilix.asClass(login_1.Login),
    verificarToken: awilix.asClass(verificarToken_1.VerificarToken),
    crearColaborador: awilix.asClass(crearColaborador_1.CrearColaborador),
    enviarCodigoRecuperarPassword: awilix.asClass(enviarCodigoRecuperarPassword_1.EnviarCodigoRecuperarPassword),
    recuperarPasswordConCodigo: awilix.asClass(recuperarPasswordConCodigo_1.RecuperarPasswordConCodigo),
    eliminarColaborador: awilix.asClass(eliminarColaborador_1.EliminarColaborador),
    obtenerCocineros: awilix.asClass(obtenerCocineros_1.ObtenerCocineros),
    actualizarUsuario: awilix.asClass(actualizarUsuario_1.ActualizarUsuario),
    obtenerProductos: awilix.asClass(producto_1.ObtenerProductos),
    agregarProducto: awilix.asClass(producto_1.AgregarProducto),
    eliminarProducto: awilix.asClass(producto_1.EliminarProducto),
    actualizarProducto: awilix.asClass(producto_1.ActualizarProducto),
    obtenerComponentes: awilix.asClass(componentes_1.ObtenerComponentes),
    agregarComponente: awilix.asClass(componentes_1.AgregarComponente),
    eliminarComponente: awilix.asClass(componentes_1.EliminarComponente),
    actualizarComponente: awilix.asClass(componentes_1.ActualizarComponente),
    obtenerMenus: awilix.asClass(menu_1.ObtenerMenus),
    agregarMenu: awilix.asClass(menu_1.AgregarMenu),
    eliminarMenu: awilix.asClass(menu_1.EliminarMenu),
    actualizarEstadoMenu: awilix.asClass(menu_1.ActualizarEstadoMenu),
    obtenerPedidos: awilix.asClass(pedido_1.ObtenerPedidos),
    agregarPedido: awilix.asClass(pedido_1.AgregarPedido),
    actualizarEstadoPedido: awilix.asClass(pedido_1.ActualizarEstadoPedido),
    usuarioController: awilix.asClass(usuario_controller_1.UsuarioController),
    productoController: awilix.asClass(controllers_1.ProductoController),
    componenteController: awilix.asClass(controllers_1.ComponenteController),
    menuController: awilix.asClass(controllers_1.MenuController),
    pedidoController: awilix.asClass(controllers_1.PedidoController),
});
