import {Contexto} from '../../persistencia/contexto';
import {Menu} from '../../dominio/entidades/menu';

export interface Comando{
  titulo: string,
  fecha: string,
  componentes: any[]
}

export  class AgregarMenu{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request:Comando){
    const menu = this.contexto.Menu.create(new Menu(request.titulo, request.fecha, request.componentes));
    return menu;
  }
}