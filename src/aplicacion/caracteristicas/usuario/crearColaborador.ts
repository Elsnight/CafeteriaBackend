import {genSalt, hash} from 'bcrypt';
import {AbstractValidator} from 'fluent-ts-validator';

import { Usuario } from "../../dominio/entidades/usuario";
import { Contexto } from '../../persistencia/contexto';
import {ErrorServer} from '../../comunes/expeciones/error';
import { IServicioArchivo } from '../../comunes/interfaces/IServicioArchivo';
import {IServicioEmail} from '../../comunes/interfaces/IServicioEmail'

export interface Comando{
  nombre?:string,
  apellido?:string,
  telefono?:string, 
  email?:string, 
  rol?:string, 
  fotoBase64?:string
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

export class CrearColaborador{
  private contexto;
  private servicioArchivo:IServicioArchivo;
  private servicioEmail: IServicioEmail;

  constructor(dependencias:{contexto:Contexto, servicioArchivo: IServicioArchivo, servicioEmail:IServicioEmail}){
    this.contexto = dependencias.contexto;
    this.servicioArchivo = dependencias.servicioArchivo;
    this.servicioEmail = dependencias.servicioEmail;
  }

  async ejecutar(request:Comando): Promise<DTO>{
    await this.validar(request);
    const codigo = this.generarCodigo();
    const nuevoUsuario = new Usuario(request.nombre!, request.apellido!, request.telefono!, request.email!, codigo, request.rol!)
    nuevoUsuario.password = await this.encriptarPassword(nuevoUsuario.password);
    if(request.fotoBase64){
      nuevoUsuario.urlFoto = await this.servicioArchivo.subir(request.fotoBase64);
    }

    const usuarioCreado = await this.contexto.Usuario.create(nuevoUsuario);
    
    await this.servicioEmail.enviarEmail(
      nuevoUsuario.email!, 
      `<h2>Credenciales</h2>
      <br>
      <p>Email: <strong>${nuevoUsuario.email}</strong></p>
      <p>Contraseña: <strong>${codigo}</strong></p>`,
      'Credenciales del comedor EPN')

    return this.getDTO(usuarioCreado);
  }

  public async encriptarPassword(password:string):Promise<string>{
    const salt = await genSalt(10);
    return await hash(password,salt);
  }

  private async validar(usuario:Comando){
    this.validarCampos(usuario);
    await this.validarExitenciaEmail(usuario.email!)
  }

  private validarCampos(usuario:Comando){
    const resultado = new ValidadorCrearColaborador().validate(usuario)
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

  private generarCodigo():string{
    let codigo:string = "";
    for (let i = 0; i < 8; i++) {
      codigo += Math.floor(Math.random()*9+1)    
    }
    return codigo;
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

export class ValidadorCrearColaborador extends AbstractValidator<Comando>{
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

    this.validateIfString(x => x.rol)
      .isNotEmpty()
      .isIn(['cocinero','administrador'])
      .withFailureMessage('El rol no es válido');
  }
}