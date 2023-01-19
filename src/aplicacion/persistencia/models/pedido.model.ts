
import { Schema, model } from "mongoose";

const PedidoSchema = new Schema({
  total: Number,
  componentes:[
    {
      _componente:{
        type: Schema.Types.ObjectId,
        ref:'componentes'
      },
      cantidad: Number
    }
  ],
  productos:[
    {
      _producto:{
        type: Schema.Types.ObjectId,
        ref:'productos'
      },
      cantidad: Number
    }
  ],
  _cliente:{
    type: Schema.Types.ObjectId,
    ref:'usuarios'
  },
  _cocinero:{
    type: Schema.Types.ObjectId,
    ref:'usuarios',
    default: null
  },
  urlComprobante: String,
  estado: [String],
  fechaCreacion: Date
});

export const pedidoModel = model('pedidos', PedidoSchema);