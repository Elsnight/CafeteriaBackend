import { Contexto } from '../../persistencia/contexto';

export class ObtenerPedidos{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request:any){
    if(request.rol == 'cliente'){
      return await this.contexto.Pedido.find({_cliente:request.id})
        .populate('_cliente')
        .populate('productos._producto')
        .populate('componentes._componente')
    }
    if(request.rol == 'cocinero'){
      return await this.contexto.Pedido.find({_cocinero:request.id})
        .populate('_cliente')
        .populate('productos._producto')
        .populate('componentes._componente')
    }
    return await this.contexto.Pedido.find()
      .populate('_cliente')
      .populate('productos._producto')
      .populate('componentes._componente')
  }
}