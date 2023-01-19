
import {Contexto} from '../../persistencia/contexto';

export interface ObtenerComponentesResponse{
  id: string;
  nombre: string;
  descripcion:string;
  precio: number;
  medida: string;
  tipo: string;
  urlFoto: string | null;
  fechaCreacion: Date;
}

export class ObtenerComponentes{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto; 
  }

  async ejecutar():Promise<ObtenerComponentesResponse[]>{
    return await this.contexto.Componente.find();
  }
}