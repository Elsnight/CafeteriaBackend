import moment from 'moment'
import {v4 as uuid} from 'uuid'

export class Usuario{
  id: string
  nombre: string
  apellido: string
  telefono: string
  email: string
  password: string
  rol: string
  urlFoto?: string | null
  fechaCreacion?: Date | null
  
  constructor(nombre:string,apellido:string,telefono:string,email:string,password:string,rol:string,urlFoto?:string,fechaCreacion?:Date){
    this.id = uuid()
    this.nombre = nombre
    this.apellido = apellido
    this.telefono = telefono
    this.email = email
    this.password = password
    this.rol = rol
    this.urlFoto = urlFoto ?? null
    this.fechaCreacion = fechaCreacion ?? new Date(moment().utc().format())
  }
}