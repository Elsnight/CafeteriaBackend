"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoModel = void 0;
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    id: String,
    nombre: String,
    precio: Number,
    stock: Number,
    fechaCreacion: Date
});
exports.productoModel = (0, mongoose_1.model)('productos', ProductoSchema);
