import {Contexto} from '../../persistencia/contexto';
import {ErrorServer} from '../../comunes/expeciones/error';

export class EliminarMenu{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(id:string){
    const menu = await this.contexto.Menu.findOneAndDelete({id});
    if(!menu) throw new ErrorServer('El id no existe!');
    return menu;
  }
}