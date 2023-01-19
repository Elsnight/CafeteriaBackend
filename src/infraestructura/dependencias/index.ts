import * as awilix from 'awilix';
import { ObtenerColaboradores } from '../../aplicacion/caracteristicas/usuario/obtenerColaboradores';
import { Registrar } from '../../aplicacion/caracteristicas/usuario/registrar';
import {Login} from '../../aplicacion/caracteristicas/usuario/login'
import { Contexto } from '../../aplicacion/persistencia/contexto';
import { UsuarioController } from '../controllers/usuario.controller';
import {VerificarToken} from  '../../aplicacion/caracteristicas/usuario/verificarToken'
import {CrearColaborador} from '../../aplicacion/caracteristicas/usuario/crearColaborador';
import {ServicioCloudinaryArchivo} from '../../aplicacion/servicios/ServicioCloudinaryArchivo'
import {ActualizarProducto, AgregarProducto, EliminarProducto, ObtenerProductos} from '../../aplicacion/caracteristicas/producto';
import {AgregarComponente, ObtenerComponentes, EliminarComponente, ActualizarComponente} from '../../aplicacion/caracteristicas/componentes'
import {ActualizarEstadoMenu, AgregarMenu, EliminarMenu, ObtenerMenus} from '../../aplicacion/caracteristicas/menu'
import {ProductoController, ComponenteController, MenuController, PedidoController} from '../controllers'
import {ActualizarEstadoPedido, AgregarPedido, ObtenerPedidos} from '../../aplicacion/caracteristicas/pedido'
import {ServicioEmail} from '../../aplicacion/servicios/ServicioEmail'
import {EnviarCodigoRecuperarPassword} from '../../aplicacion/caracteristicas/usuario/enviarCodigoRecuperarPassword';
import {RecuperarPasswordConCodigo} from '../../aplicacion/caracteristicas/usuario/recuperarPasswordConCodigo'
import {EliminarColaborador} from '../../aplicacion/caracteristicas/usuario/eliminarColaborador'
import {ObtenerCocineros} from '../../aplicacion/caracteristicas/usuario/obtenerCocineros'
import {ActualizarUsuario} from '../../aplicacion/caracteristicas/usuario/actualizarUsuario'

export const contenedor = awilix.createContainer();

contenedor.register({
  contexto: awilix.asClass(Contexto),
  servicioArchivo: awilix.asClass(ServicioCloudinaryArchivo),
  servicioEmail: awilix.asClass(ServicioEmail),

  obtenerColaboradores: awilix.asClass(ObtenerColaboradores),
  registrar: awilix.asClass(Registrar),
  login: awilix.asClass(Login),
  verificarToken: awilix.asClass(VerificarToken),
  crearColaborador: awilix.asClass(CrearColaborador),
  enviarCodigoRecuperarPassword: awilix.asClass(EnviarCodigoRecuperarPassword),
  recuperarPasswordConCodigo: awilix.asClass(RecuperarPasswordConCodigo),
  eliminarColaborador: awilix.asClass(EliminarColaborador),
  obtenerCocineros: awilix.asClass(ObtenerCocineros),
  actualizarUsuario: awilix.asClass(ActualizarUsuario),

  obtenerProductos: awilix.asClass(ObtenerProductos),
  agregarProducto: awilix.asClass(AgregarProducto),
  eliminarProducto: awilix.asClass(EliminarProducto),
  actualizarProducto: awilix.asClass(ActualizarProducto),

  obtenerComponentes: awilix.asClass(ObtenerComponentes),
  agregarComponente: awilix.asClass(AgregarComponente),
  eliminarComponente: awilix.asClass(EliminarComponente),
  actualizarComponente: awilix.asClass(ActualizarComponente),

  obtenerMenus: awilix.asClass(ObtenerMenus),
  agregarMenu: awilix.asClass(AgregarMenu),
  eliminarMenu: awilix.asClass(EliminarMenu),
  actualizarEstadoMenu: awilix.asClass(ActualizarEstadoMenu),

  obtenerPedidos: awilix.asClass(ObtenerPedidos),
  agregarPedido: awilix.asClass(AgregarPedido),
  actualizarEstadoPedido: awilix.asClass(ActualizarEstadoPedido),

  usuarioController: awilix.asClass(UsuarioController),
  productoController: awilix.asClass(ProductoController),
  componenteController: awilix.asClass(ComponenteController),
  menuController: awilix.asClass(MenuController),
  pedidoController: awilix.asClass(PedidoController),
  
});
