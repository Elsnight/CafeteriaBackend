import moment from 'moment'
import {v4 as uuid} from 'uuid'

//type Tipo = 'bebida' | 'caldo' | 'segundo' | 'extra';

export class Componente{
  id: string;
  nombre: string;
  descripcion:string;
  precio: number;
  medida: string;
  tipo: string;
  urlFoto?: string | null;
  fechaCreacion: Date;

  constructor(nombre:string, descripcion:string, precio:number, medida:string, tipo: string, urlFoto?:string){
    this.id = uuid();
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.medida = medida;
    this.tipo = tipo;
    this.urlFoto = urlFoto ?? null;
    this.fechaCreacion = new Date(moment().utc().format());
  }
}