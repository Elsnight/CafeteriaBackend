
import {Contexto} from '../../persistencia/contexto'

export interface ObtenerProductosResponse{
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  fechaCreacion: Date;
}

export class ObtenerProductos{
  private contexto:Contexto;
  
  constructor(dependecias:{contexto:Contexto}){
    this.contexto = dependecias.contexto;
  }

  async ejecutar():Promise<ObtenerProductosResponse[]> {
    return await this.contexto.Producto.find()
  }
}
