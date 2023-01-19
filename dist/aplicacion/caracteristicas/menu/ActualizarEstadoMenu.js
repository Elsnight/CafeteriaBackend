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
exports.ActualizarEstadoMenu = void 0;
class ActualizarEstadoMenu {
    constructor(dependencias) {
        this.contexto = dependencias.contexto;
    }
    ejecutar(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield this.contexto.Menu.findById(request.id);
            menu === null || menu === void 0 ? void 0 : menu.componentes.map((x) => {
                if (x._componente._id == request._componente) {
                    x.estado = !x.estado;
                }
                return x;
            });
            yield (menu === null || menu === void 0 ? void 0 : menu.save());
            return menu;
        });
    }
}
exports.ActualizarEstadoMenu = ActualizarEstadoMenu;
