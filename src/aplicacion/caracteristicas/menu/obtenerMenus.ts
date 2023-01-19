
import {Contexto} from '../../persistencia/contexto';

export class ObtenerMenus{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto; 
  }

  async ejecutar():Promise<any[]>{
    return await this.contexto.Menu.find().populate('componentes._componente');
  }
}