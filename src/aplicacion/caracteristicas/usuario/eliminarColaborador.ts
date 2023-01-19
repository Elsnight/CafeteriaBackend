import { Contexto } from '../../persistencia/contexto';
import {ErrorServer} from '../../comunes/expeciones/error';

interface IRequest{
  id: string
}

export class EliminarColaborador{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request: IRequest){
    const usuario = await this.contexto.Usuario.findByIdAndDelete(request.id);
    if(!usuario){
      throw new ErrorServer('El id no existe!');
    }
    return usuario;
  }
}
