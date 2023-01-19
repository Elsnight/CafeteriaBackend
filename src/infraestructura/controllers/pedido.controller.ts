import { Request, Response } from "express";

import {verificarRol} from '../helpers/verificarRol'
import {ActualizarEstadoPedido, AgregarPedido, ObtenerPedidos} from  '../../aplicacion/caracteristicas/pedido'
import {VerificarToken} from '../../aplicacion/caracteristicas/usuario/verificarToken'
import {ejecutarError} from '../error'

export class PedidoController{
  private agregar: AgregarPedido
  private verificarToken:VerificarToken;
  private obtenerPedidos:ObtenerPedidos;
  private actualizarEstado: ActualizarEstadoPedido;

  constructor(depedencias:{agregarPedido:AgregarPedido, verificarToken:VerificarToken, obtenerPedidos:ObtenerPedidos, actualizarEstadoPedido:ActualizarEstadoPedido}){
    this.verificarToken = depedencias.verificarToken;
    this.agregar = depedencias.agregarPedido;
    this.obtenerPedidos = depedencias.obtenerPedidos;
    this.actualizarEstado = depedencias.actualizarEstadoPedido;
  }

  getAll = async(req:Request, res:Response)=>{
    try {
      const usuario = await this.verificarToken.ejecutar(req.headers as any);
      const data = await this.obtenerPedidos.ejecutar({id:usuario._id,rol: usuario.rol});
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  create = async(req:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["cliente"]
      const usuario = await this.verificarToken.ejecutar(req.headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.agregar.ejecutar(req.body);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  updateState = async(req:Request, res:Response)=>{
    try {
      await this.verificarToken.ejecutar(req.headers as any);
      const data = await this.actualizarEstado.ejecutar(req.body);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }
}
