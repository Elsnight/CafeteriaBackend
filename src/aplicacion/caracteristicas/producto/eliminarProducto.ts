import { ErrorServer } from '../../comunes/expeciones/error';
import {Contexto} from '../../persistencia/contexto'

export interface EliminarProductoResponse{
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  fechaCreacion: Date;
}

export class EliminarProducto{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(id:string):Promise<EliminarProductoResponse>{
    
    const producto = await this.contexto.Producto.findOneAndDelete({id});
    
    if(!producto) throw new ErrorServer("El id no existe!");

    return{
      id: producto.id,
      nombre: producto.nombre!,
      precio: producto.precio!,
      stock: producto.stock!,
      fechaCreacion: producto.fechaCreacion!
    }
  }
}