import moment from 'moment'
import {v4 as uuid} from 'uuid'

export class Menu{
  id: string;
  titulo: string;
  fecha: string;
  componentes: any[];
  fechaCreacion: Date;

  constructor(titulo:string, fecha:string, componentes:any[]){
    this.id = uuid();
    this.titulo = titulo;
    this.fecha = fecha;
    this.componentes = componentes;
    this.fechaCreacion = new Date(moment().utc().format());
  }
}