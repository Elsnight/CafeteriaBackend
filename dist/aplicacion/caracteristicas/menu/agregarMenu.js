"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregarMenu = void 0;
const menu_1 = require("../../dominio/entidades/menu");
class AgregarMenu {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = this.contexto.Menu.create(new menu_1.Menu(request.titulo, request.fecha, request.componentes));
            return menu;
        });
    }
}
exports.AgregarMenu = AgregarMenu;
