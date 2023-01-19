import { Request, Response } from "express";

import { CrearColaborador } from "../../aplicacion/caracteristicas/usuario/crearColaborador";
import { Login } from "../../aplicacion/caracteristicas/usuario/login";
import { ObtenerColaboradores } from "../../aplicacion/caracteristicas/usuario/obtenerColaboradores";
import { Registrar } from "../../aplicacion/caracteristicas/usuario/registrar";
import { VerificarToken } from "../../aplicacion/caracteristicas/usuario/verificarToken";
import { EnviarCodigoRecuperarPassword } from "../../aplicacion/caracteristicas/usuario/enviarCodigoRecuperarPassword";
import { RecuperarPasswordConCodigo } from "../../aplicacion/caracteristicas/usuario/recuperarPasswordConCodigo";
import { EliminarColaborador } from "../../aplicacion/caracteristicas/usuario/eliminarColaborador";
import {ejecutarError} from '../error';
import {verificarRol} from '../helpers/verificarRol'
import { ObtenerCocineros } from "../../aplicacion/caracteristicas/usuario/obtenerCocineros";
import { ActualizarUsuario } from "../../aplicacion/caracteristicas/usuario/actualizarUsuario";

export class UsuarioController{
  private obtenerColaboradores;
  private registrar;
  private login;
  private verificarToken;
  private crearColaborador;
  private enviarCodigoRecuperarPassword;
  private recuperarPasswordConCodigo:RecuperarPasswordConCodigo;
  private eliminarColaborador:EliminarColaborador;
  private obtenerCocineros: ObtenerCocineros;
  private actualizarUsuario: ActualizarUsuario;

  constructor(dependencias:{
      obtenerColaboradores: ObtenerColaboradores, 
      registrar: Registrar, 
      login:Login, 
      verificarToken:VerificarToken, 
      crearColaborador:CrearColaborador, 
      enviarCodigoRecuperarPassword:EnviarCodigoRecuperarPassword, 
      recuperarPasswordConCodigo:RecuperarPasswordConCodigo,
      eliminarColaborador:EliminarColaborador,
      obtenerCocineros: ObtenerCocineros,
      actualizarUsuario: ActualizarUsuario,
    }){
    this.obtenerColaboradores = dependencias.obtenerColaboradores;
    this.registrar = dependencias.registrar;
    this.login = dependencias.login;
    this.verificarToken = dependencias.verificarToken;
    this.crearColaborador = dependencias.crearColaborador;
    this.enviarCodigoRecuperarPassword = dependencias.enviarCodigoRecuperarPassword;
    this.recuperarPasswordConCodigo = dependencias.recuperarPasswordConCodigo;
    this.eliminarColaborador = dependencias.eliminarColaborador;
    this.obtenerCocineros = dependencias.obtenerCocineros;
    this.actualizarUsuario = dependencias.actualizarUsuario;
  }
  
  getCollaborators = async ({headers}:Request, res:Response) => {
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos);
      const data = await this.obtenerColaboradores.ejecutar();
      return res.json(data);
    } catch (error:any) {   
      ejecutarError(res,error);
    }
  }

  create = async({body}:Request, res:Response)=>{
    try {
      const data = await this.registrar.ejecutar(body);
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  signIn =async ({body}:Request, res:Response)=>{
    try {
      const data = await this.login.ejecutar(body);
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  verifyToken = async ({headers}:Request, res:Response)=>{
    try {      
      const data = await this.verificarToken.ejecutar(headers as any);
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  createCollaborator = async ({headers,body}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos)
      const data = await this.crearColaborador.ejecutar(body);
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  sendCodeRecoveryPassword = async ({body}:Request, res:Response)=>{
    try {
      const data = await this.enviarCodigoRecuperarPassword.ejecutar(body);
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  recoveryPassword = async ({body}:Request, res:Response)=>{
    try {
      const data = await this.recuperarPasswordConCodigo.ejecutar(body);
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  delete = async ({params, headers}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos)
      const data = await this.eliminarColaborador.ejecutar({id:params.id});
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  getConcineros =  async ({params, headers}:Request, res:Response)=>{
    try {
      const rolesPermitidos = ["administrador"]
      const usuario = await this.verificarToken.ejecutar(headers as any);
      verificarRol(usuario.rol, rolesPermitidos)
      const data = await this.obtenerCocineros.ejecutar();
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

  update =  async ({body, headers}:Request, res:Response)=>{
    try {
      const usuario = await this.verificarToken.ejecutar(headers as any);
      const data = await this.actualizarUsuario.ejecutar({id:usuario._id, ...body});
      return res.json(data);
    } catch (error:any) {
      ejecutarError(res,error);
    }
  }

}
