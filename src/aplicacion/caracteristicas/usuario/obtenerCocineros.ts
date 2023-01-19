import {Contexto} from '../../persistencia/contexto'

export class ObtenerCocineros{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  public async ejecutar():Promise<any[]>{
    const cocineros =  await this.contexto.Usuario.find({
      rol:{
        '$in':['cocinero']
      }
    });
    let data:any[] = [];

    for (let i = 0; i < cocineros.length; i++) {
      let pedidosPendientes = 0;
      let pedidos = await this.contexto.Pedido.find({_cocinero:cocineros[i]._id});
      pedidos.forEach(x => {
        if(x.estado[x.estado.length-1] == 'verificado'){
          pedidosPendientes++;
        }
      })
      const {_id, nombre, apellido} = cocineros[i];
      data.push({
        pedidosPendientes,
        _id,
        nombre,
        apellido
      })
    }

    return data;
  }
}