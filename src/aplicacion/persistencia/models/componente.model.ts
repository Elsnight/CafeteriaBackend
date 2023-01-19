import { Schema, model } from "mongoose";

const ComponenteSchema = new Schema({
  id:String,
  nombre: String,
  descripcion: String,
  precio: Number,
  medida: String,
  tipo: String,
  urlFoto: String,
  fechaCreacion: Date
});

export const componenteModel = model('componentes', ComponenteSchema);