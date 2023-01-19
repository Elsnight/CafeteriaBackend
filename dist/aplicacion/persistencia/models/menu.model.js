"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuModel = void 0;
const mongoose_1 = require("mongoose");
const MenuSchema = new mongoose_1.Schema({
    id: String,
    titulo: String,
    fecha: Date,
    componentes: [
        {
            _componente: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'componentes'
            },
            estado: {
                type: Boolean,
                default: true
            }
        }
    ],
    fechaCreacion: Date
});
exports.menuModel = (0, mongoose_1.model)('menus', MenuSchema);
