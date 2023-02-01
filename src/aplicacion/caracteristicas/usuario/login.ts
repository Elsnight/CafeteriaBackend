import { AbstractValidator } from 'fluent-ts-validator'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { Contexto } from '../../persistencia/contexto'
import { ErrorServer } from '../../comunes/expeciones/error'
import { SECRET } from '../../../infraestructura/config'


export interface Comando {
  email?: string
  password?: string
}

export interface DTO {
  _id: string,
  id: string,
  nombre: string,
  apellido: string,
  telefono: string,
  email: string,
  rol: string,
  urlFoto?: string | null,
  fechaCreacion: Date,
  token: string
}
export class Login {
  private contexto: Contexto;

  constructor(dependencias: { contexto: Contexto }) {
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request: Comando) {
    this.validarCampos(request);

    const usuario = await this.contexto.Usuario.findOne({ email: request.email });

    if (!usuario) throw new ErrorServer('Credenciales incorrectas!')

    const resultado = await compare(request.password!, usuario.password!)

    if (!resultado) {
      throw new ErrorServer('Credenciales incorrectas!')
    }


    return this.getDTO(usuario);
  }

  validarCampos(comando: Comando) {
    const respuesta = new ValidadorLogin().validate(comando);
    if (respuesta.isInvalid()) {
      throw new ErrorServer('Campos incorrectos!', 400, respuesta.getFailureMessages())
    }
  }

  public generarToken(id: string): string {
    const token = sign(
      { id },
      SECRET as string,
      {
        expiresIn: '7d'
      }
    );
    return token;
  }

  private getDTO(usuario: any): DTO {
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
      token: this.generarToken(usuario.id)
    }
  }
}

export class ValidadorLogin extends AbstractValidator<Comando>{
  constructor() {
    super();

    this.validateIfString(x => x.email)
      .isNotEmpty()
      .isEmail()
      .withFailureMessage('El email no es válido!');

    this.validateIfString(x => x.password)
      .isNotEmpty()
      .hasMinLength(8)
      .withFailureMessage('El password no es válido!');
  }
}