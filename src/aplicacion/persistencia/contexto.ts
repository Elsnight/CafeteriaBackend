import {usuarioModel} from './models/usuario.model'
import {productoModel} from './models/producto.model'
import {componenteModel} from './models/componente.model'
import {menuModel} from './models/menu.model';
import {pedidoModel} from './models/pedido.model'

export class Contexto{
  Usuario = usuarioModel;
  Producto = productoModel;
  Componente = componenteModel;
  Menu = menuModel;
  Pedido = pedidoModel
}