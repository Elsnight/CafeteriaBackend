import { Schema, model } from "mongoose";

const ProductoSchema = new Schema({
  id:String,
  nombre: String,
  precio: Number,
  stock: Number,
  fechaCreacion: Date
})

export const productoModel = model('productos', ProductoSchema);