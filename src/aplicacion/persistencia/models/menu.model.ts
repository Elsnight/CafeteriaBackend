import { Schema, model } from "mongoose";

const MenuSchema = new Schema({
  id:String,
  titulo: String,
  fecha: Date,
  componentes:[
    {
      _componente:{
        type: Schema.Types.ObjectId,
        ref:'componentes'
      },
      estado: {
        type: Boolean,
        default: true
      }
    }
  ],
  fechaCreacion: Date
});

export const menuModel = model('menus', MenuSchema);