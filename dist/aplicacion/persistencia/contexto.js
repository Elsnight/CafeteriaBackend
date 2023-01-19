"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contexto = void 0;
const usuario_model_1 = require("./models/usuario.model");
const producto_model_1 = require("./models/producto.model");
const componente_model_1 = require("./models/componente.model");
const menu_model_1 = require("./models/menu.model");
const pedido_model_1 = require("./models/pedido.model");
class Contexto {
    constructor() {
        this.Usuario = usuario_model_1.usuarioModel;
        this.Producto = producto_model_1.productoModel;
        this.Componente = componente_model_1.componenteModel;
        this.Menu = menu_model_1.menuModel;
        this.Pedido = pedido_model_1.pedidoModel;
    }
}
exports.Contexto = Contexto;
