import { Request, Response } from "express";

import {verificarRol} from '../helpers/verificarRol'
import {ActualizarComponente, AgregarComponente, EliminarComponente, ObtenerComponentes} from  '../../aplicacion/caracteristicas/componentes'
import {VerificarToken} from '../../aplicacion/caracteristicas/usuario/verificarToken'
import {ejecutarError} from '../error'

export class ComponenteController{
  private obtenerComponentes: ObtenerComponentes;
  private verificarToken:VerificarToken;
  private agregarComponente: AgregarComponente;
  private eliminarComponente: EliminarComponente;
  private actualizarComponente: ActualizarComponente;

  constructor(depedencias:{obtenerComponentes:ObtenerComponentes, verificarToken:VerificarToken, agregarComponente:AgregarComponente, eliminarComponente: EliminarComponente, actualizarComponente:ActualizarComponente}){
    this.obtenerComponentes = depedencias.obtenerComponentes;
    this.verificarToken = depedencias.verificarToken;
    this.agregarComponente = depedencias.agregarComponente;
    this.eliminarComponente = depedencias.eliminarComponente;
    this.actualizarComponente = depedencias.actualizarComponente;
  }

  getAll = async(req:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(req.headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.obtenerComponentes.ejecutar();
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  create = async({body, headers}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.agregarComponente.ejecutar(body);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  delete = async({params, headers}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.eliminarComponente.ejecutar(params.id);
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

  update = async({params, body, headers}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.actualizarComponente.ejecutar({...body,id:params.id});
      res.json(data);
    } catch (error) {
      ejecutarError(res,error);
    }
  }

}