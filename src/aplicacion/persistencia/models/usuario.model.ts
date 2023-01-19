import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  id: String,
  nombre: String,
  apellido: String,
  telefono: String,
  email: String,
  password: String,
  rol: {
    type: String,
    enum:['administrador','cliente','cocinero']
  },
  urlFoto: {
    type:String,
    default: null
  },
  codigo: {
    type:String,
    default: null
  },
  fechaCreacion: Date
});

export const usuarioModel = model('usuarios',UsuarioSchema)