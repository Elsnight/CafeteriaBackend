import {genSalt, hash} from 'bcrypt';
import {AbstractValidator} from 'fluent-ts-validator';

import { Usuario } from "../../dominio/entidades/usuario";
import { Contexto } from '../../persistencia/contexto';
import {ErrorServer} from '../../comunes/expeciones/error';
import {IServicioArchivo} from '../../comunes/interfaces/IServicioArchivo'

export interface Comando{
  nombre?:string,
  apellido?:string,
  telefono?:string, 
  email?:string, 
  password?:string, 
  rol?:string, 
  fotoBase64?:string | null
}

export interface DTO{
  id:string,
  nombre:string,
  apellido:string,
  telefono:string, 
  email:string, 
  rol:string, 
  urlFoto?:string | null,
  fechaCreacion: Date
}

export class Registrar{
  private contexto:Contexto;
  private servicioArchivo:IServicioArchivo;

  constructor(dependencias:{contexto:Contexto, servicioArchivo: IServicioArchivo}){
    this.contexto = dependencias.contexto;
    this.servicioArchivo = dependencias.servicioArchivo;
  }

  async ejecutar(usuario:Comando): Promise<DTO>{
    await this.validar(usuario);
    
    const nuevoUsuario = new Usuario(usuario.nombre!, usuario.apellido!, usuario.telefono!, usuario.email!, usuario.password!, usuario.rol!)
    nuevoUsuario.password = await this.encriptarPassword(nuevoUsuario.password);
    if(usuario.fotoBase64){
      nuevoUsuario.urlFoto = await this.servicioArchivo.subir(usuario.fotoBase64);
    }
    const usuarioCreado = await this.contexto.Usuario.create(nuevoUsuario);
    
    return this.getDTO(usuarioCreado);
  }

  public async encriptarPassword(password:string):Promise<string>{
    const salt = await genSalt(10);
    return await hash(password,salt);
  }

  private async validar(usuario:Comando){
    this.validarCampos(usuario);
    await this.validarExitenciaEmail(usuario.email!)
    if(usuario.rol == 'administrador') await this.validarQueNoExistaUnAdmin();
  }

  private validarCampos(usuario:Comando){
    const resultado = new ValidadorRegistro().validate(usuario)
    if(resultado.isInvalid()){
      throw new ErrorServer('Campos incorrectos!',400,resultado.getFailureMessages())
    }
  }

  private async validarExitenciaEmail(email:string){
    const resultado = await this.contexto.Usuario.find({email});
    if(resultado.length != 0){
      throw new ErrorServer('El email ya está registrado!')
    }
  }

  private async validarQueNoExistaUnAdmin(){
    const resultado = await this.contexto.Usuario.find({rol:'administrador'});
    if(resultado.length != 0){
      throw new ErrorServer('Ya existe un administrador registrado!')
    }
  }
  
  private getDTO(usuario:any):DTO{
    return {
      id: usuario.id as string,
      nombre: usuario.nombre as string,
      apellido: usuario.apellido as string,
      telefono: usuario.telefono as string,
      email: usuario.email as string,
      rol: usuario.rol as string,
      fechaCreacion: usuario.fechaCreacion as Date,
      urlFoto: usuario.urlFoto
    }
  }
}

export class ValidadorRegistro extends AbstractValidator<Comando>{
  constructor(){
    super();
    
    this.validateIfString(x => x.nombre)
      .isNotEmpty()
      .hasLengthBetween(2,50)
      .withFailureMessage("El nombre no es válido")
    
    this.validateIfString(x => x.apellido)
      .isNotEmpty()
      .hasLengthBetween(2,50)
      .withFailureMessage('El apellido no es válido');

    this.validateIfString(x => x.telefono)
      .isNotEmpty()
      .isNumericString()
      .withFailureMessage('El telefono no es válido');
    
    this.validateIfString(x => x.email)
      .isNotEmpty()
      .isEmail()
      .withFailureMessage('El email no es válido');

    this.validateIfString(x => x.password)
      .isNotEmpty()
      .hasMinLength(8)
      .withFailureMessage('El password no es válido');

    this.validateIfString(x => x.rol)
      .isNotEmpty()
      .isIn(['cliente','administrador'])
      .withFailureMessage('El rol no es válido');
      
  }
}