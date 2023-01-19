"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componenteModel = void 0;
const mongoose_1 = require("mongoose");
const ComponenteSchema = new mongoose_1.Schema({
    id: String,
    nombre: String,
    descripcion: String,
    precio: Number,
    medida: String,
    tipo: String,
    urlFoto: String,
    fechaCreacion: Date
});
exports.componenteModel = (0, mongoose_1.model)('componentes', ComponenteSchema);
