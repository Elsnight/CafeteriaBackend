import {Contexto} from '../../persistencia/contexto';

interface Comando{
  id: string,
  _componente: string
}

export class ActualizarEstadoMenu{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request:Comando){
    const menu = await this.contexto.Menu.findById(request.id)
    menu?.componentes.map((x:any)=>{
      if(x._componente._id == request._componente){
        x.estado = !x.estado;
      }
      return x;
    })
    await menu?.save();
    return menu;
  }
}