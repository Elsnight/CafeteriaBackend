import {genSalt, hash} from 'bcrypt';

import {Contexto} from '../../persistencia/contexto'
import {ErrorServer} from '../../comunes/expeciones/error'

interface IRequest{
  email: string;
  codigo: string;
  password: string;
}

export class RecuperarPasswordConCodigo{
  private contexto:Contexto;

  constructor(dependencias: {contexto: Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request:IRequest){
    if(!request.email){
      throw new ErrorServer('Debe enviar el email!');
    }
    if(!request.codigo){
      throw new ErrorServer('Debe enviar el codigo!');
    }
    if(!request.password){
      throw new ErrorServer('Debe enviar el password!');
    }

    if(request.password.length < 8){
      throw new ErrorServer('El password debe tener al menos 8 caracteres!');
    }

    const usuario = await this.contexto.Usuario.findOne({email: request.email});
    if(!usuario){
      throw new ErrorServer('El email no existe!');
    }

    if(usuario.codigo != request.codigo){
      throw new ErrorServer('El código es incorrecto!');
    }

    usuario.codigo = this.generarCodigo();
    usuario.password = await this.encriptarPassword(request.password.toString());
    await usuario.save();
    return usuario;
  }

  private generarCodigo():string{
    let codigo:string = "";
    for (let i = 0; i < 6; i++) {
      codigo += Math.floor(Math.random()*9+1)    
    }
    return codigo;
  }

  public async encriptarPassword(password:string):Promise<string>{
    const salt = await genSalt(10);
    return await hash(password,salt);
  }
}