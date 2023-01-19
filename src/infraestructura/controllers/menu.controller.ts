import { Request, Response } from "express";

import {ObtenerMenus, AgregarMenu, EliminarMenu, ActualizarEstadoMenu} from '../../aplicacion/caracteristicas/menu'
import {verificarRol} from '../helpers/verificarRol'
import {VerificarToken} from '../../aplicacion/caracteristicas/usuario/verificarToken'
import {ejecutarError} from '../error'

export class MenuController{
  private obtenerMenus:ObtenerMenus;
  private verificarToken: VerificarToken;
  private agregarMenu: AgregarMenu;
  private eliminarMenu: EliminarMenu;
  private actualizarEstado: ActualizarEstadoMenu

  constructor(dependencias:{obtenerMenus:ObtenerMenus, verificarToken:VerificarToken, agregarMenu: AgregarMenu, eliminarMenu: EliminarMenu, actualizarEstadoMenu:ActualizarEstadoMenu}){
    this.obtenerMenus = dependencias.obtenerMenus;
    this.verificarToken = dependencias.verificarToken;
    this.agregarMenu = dependencias.agregarMenu;
    this.eliminarMenu = dependencias.eliminarMenu;
    this.actualizarEstado = dependencias.actualizarEstadoMenu;
  } 

  getAll = async(req:Request, res:Response)=>{
    try {
      await this.verificarToken.ejecutar(req.headers as any);
      const data = await this.obtenerMenus.ejecutar();
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  create = async(req:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(req.headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.agregarMenu.ejecutar(req.body);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  delete = async(req:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(req.headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.eliminarMenu.ejecutar(req.params.id);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  updateState = async(req:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador",'cocinero']
      const usuario = await this.verificarToken.ejecutar(req.headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.actualizarEstado.ejecutar(req.body);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }
}