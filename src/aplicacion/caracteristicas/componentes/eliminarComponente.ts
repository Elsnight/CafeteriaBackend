import { ErrorServer } from '../../comunes/expeciones/error';
import {Contexto} from '../../persistencia/contexto';

export class EliminarComponente{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(id:string){
    const data = await this.contexto.Componente.findOneAndDelete({id:id});
    if(!data) throw new ErrorServer('No existe el componente!');
    return data;
  }
}