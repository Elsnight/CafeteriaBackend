"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidoModel = void 0;
const mongoose_1 = require("mongoose");
const PedidoSchema = new mongoose_1.Schema({
    total: Number,
    componentes: [
        {
            _componente: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'componentes'
            },
            cantidad: Number
        }
    ],
    productos: [
        {
            _producto: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'productos'
            },
            cantidad: Number
        }
    ],
    _cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    _cocinero: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'usuarios',
        default: null
    },
    urlComprobante: String,
    estado: [String],
    fechaCreacion: Date
});
exports.pedidoModel = (0, mongoose_1.model)('pedidos', PedidoSchema);
