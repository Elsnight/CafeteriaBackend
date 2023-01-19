import { Request, Response } from "express";

import {verificarRol} from '../helpers/verificarRol'
import {ActualizarProducto, AgregarProducto, EliminarProducto, ObtenerProductos} from  '../../aplicacion/caracteristicas/producto'
import {VerificarToken} from '../../aplicacion/caracteristicas/usuario/verificarToken'
import {ejecutarError} from '../error'

export class ProductoController{
  private obtenerProductos: ObtenerProductos
  private verificarToken:VerificarToken;
  private agregarProducto:AgregarProducto;
  private eliminarProducto: EliminarProducto;
  private actualizar: ActualizarProducto;

  constructor(depedencias:{obtenerProductos:ObtenerProductos, verificarToken:VerificarToken, agregarProducto:AgregarProducto, eliminarProducto:EliminarProducto, actualizarProducto:ActualizarProducto}){
    this.obtenerProductos = depedencias.obtenerProductos;
    this.verificarToken = depedencias.verificarToken;
    this.agregarProducto = depedencias.agregarProducto;
    this.eliminarProducto = depedencias.eliminarProducto;  
    this.actualizar = depedencias.actualizarProducto;
  }

  getAll = async(req:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador","cliente"]
      const usuario = await this.verificarToken.ejecutar(req.headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.obtenerProductos.ejecutar();
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  create = async({headers,body}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.agregarProducto.ejecutar(body);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  delete = async({headers,params}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.eliminarProducto.ejecutar(params.id);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  update = async({headers,body, params}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.actualizar.ejecutar({...body,id:params.id});
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }
  
}