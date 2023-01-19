import {Contexto} from '../../persistencia/contexto'

export class ActualizarProducto{
  private contexto:Contexto;
  
  constructor(dependecias:{contexto:Contexto}){
    this.contexto = dependecias.contexto;
  }

  async ejecutar(request:any){

    const producto = await this.contexto.Producto.findByIdAndUpdate(request.id,{
      nombre: request.nombre,
      precio: request.precio,
      stock: request.stock
    });

    return producto;
  }
}
