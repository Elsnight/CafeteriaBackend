import {genSalt, hash} from 'bcrypt';

import { Contexto } from '../../persistencia/contexto';
import {ErrorServer} from '../../comunes/expeciones/error';
import {IServicioArchivo} from '../../comunes/interfaces/IServicioArchivo'

export interface Comando{
  id?: string,
  telefono?:string, 
  password?:string, 
  fotoBase64?:string | null
}



export class ActualizarUsuario{
  private contexto:Contexto;
  private servicioArchivo:IServicioArchivo;

  constructor(dependencias:{contexto:Contexto, servicioArchivo: IServicioArchivo}){
    this.contexto = dependencias.contexto;
    this.servicioArchivo = dependencias.servicioArchivo;
  }

  async ejecutar(request:Comando): Promise<any>{
    const usuario = await this.contexto.Usuario.findById(request.id);
    if(!usuario){
      throw new ErrorServer('El id no existe!');
    }
    if(request.fotoBase64){
      usuario.urlFoto = await this.servicioArchivo.subir(request.fotoBase64) as any;
    }
    if(request.password){
      usuario.password = await this.encriptarPassword(request.password);
    }
    if(request.telefono){
      usuario.telefono = request.telefono;
    }
    usuario.save();
    
    return usuario;
  }

  public async encriptarPassword(password:string):Promise<string>{
    const salt = await genSalt(10);
    return await hash(password,salt);
  }
}
