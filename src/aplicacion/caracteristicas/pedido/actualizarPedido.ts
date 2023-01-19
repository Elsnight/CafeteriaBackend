import { Contexto } from '../../persistencia/contexto';

export class ActualizarEstadoPedido{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request:any){
    const pedido = await this.contexto.Pedido.findById(request.id);
    pedido?.estado.push(request.estado);
    if(request.estado == 'verificado'){
      pedido!._cocinero = request.cocinero;
    }
    pedido?.save();
    return pedido;
  }
}