import {Contexto} from '../../persistencia/contexto';

export interface ActualizarComponenteRequest{
  id:string,
  nombre: string,
  descripcion: string,
  precio: number,
  medida: string,
  tipo: string,
}

export class ActualizarComponente{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  async ejecutar(request:ActualizarComponenteRequest){
    const {nombre, descripcion, precio, medida, tipo} = request;
    
    const componente = await this.contexto.Componente.findOneAndUpdate({id:request.id},{nombre,descripcion,precio,medida,tipo});

    return componente;
  }
}