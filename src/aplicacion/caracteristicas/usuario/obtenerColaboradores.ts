import {Contexto} from '../../persistencia/contexto'

export class ObtenerColaboradores{
  private contexto:Contexto;

  constructor(dependencias:{contexto:Contexto}){
    this.contexto = dependencias.contexto;
  }

  public async ejecutar():Promise<any[]>{
    return await this.contexto.Usuario.find({
      rol:{
        '$in':['administrador','cocinero']
      }
    })
  }
}