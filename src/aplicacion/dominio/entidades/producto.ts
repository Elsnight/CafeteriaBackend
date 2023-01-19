import moment from 'moment'
import {v4 as uuid} from 'uuid'

export class Producto{
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  fechaCreacion: Date

  constructor(nombre:string, precio:number, stock:number){
    this.id = uuid();
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.fechaCreacion = new Date(moment().utc().format());
  }
}