import {AbstractValidator} from 'fluent-ts-validator'
import {JsonWebTokenError, JwtPayload, TokenExpiredError, verify} from 'jsonwebtoken'

import {Contexto} from '../../persistencia/contexto'
import {SECRET} from '../../../infraestructura/config'
import { ErrorServer } from '../../comunes/expeciones/error'

export interface Comando{
  token?: string
}

export interface DTO{
  _id:string,
  id:string,
  nombre:string,
  apellido:string,
  telefono:string, 
  email:string, 
  rol:string, 
  urlFoto?:string | null,
  fechaCreacion: Date,
  token: string
}

export class VerificarToken{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}) {
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request:Comando){
    this.validar(request)
    const decodificado = this.validarToken(request);
    if(!decodificado.id) throw new ErrorServer("El token no esta codificado correctamente!");
    
    const usuario = await this.contexto.Usuario.findOne({id:decodificado.id});
    if(!usuario) throw new ErrorServer('El token no coincide con ningún usuario!');
    return this.getDTO(usuario,request.token!);
  }
  
  private validar(comando:Comando){
    this.validarCampos(comando);
  }
  
  private validarCampos(comando:Comando){
    const respuesta = new ValidadorVerificarToken().validate(comando);
    if(respuesta.isInvalid()){
      throw new ErrorServer(respuesta.getFailureMessages().pop());
    }
  }
  
  private validarToken(comando:Comando){
    try {
      const decodificado = verify(comando.token!, SECRET!) as JwtPayload;
      return decodificado;
    } catch (error:any) {
      if(error instanceof TokenExpiredError) throw new ErrorServer("El token ha expirado!");
      if(error instanceof JsonWebTokenError) throw new ErrorServer("El token no tiene el formato correcto!");
      throw new ErrorServer(error.message)
    }
  }

  private getDTO(usuario:any, token:string):DTO{
    return {
      _id: usuario._id,
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono, 
      email: usuario.email, 
      rol: usuario.rol, 
      urlFoto: usuario.urlFoto,
      fechaCreacion: usuario.fechaCreacion,
      token
    }
  }

}

export class ValidadorVerificarToken extends AbstractValidator<Comando>{
  
  constructor() {
    super();
    this.validateIfString(x => x.token)
      .isNotEmpty()
      .withFailureMessage('El token no puede estar vacío!')
  }
}