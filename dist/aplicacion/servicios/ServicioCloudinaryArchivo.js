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
exports.ServicioCloudinaryArchivo = void 0;
const cloudinary_1 = require("cloudinary");
class ServicioCloudinaryArchivo {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: 'dtim15nqh',
            api_key: '648621655632133',
            api_secret: 'mBWAvenJC_KiKKVHFZASHYcQDh4'
        });
    }
    subir(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield cloudinary_1.v2.uploader.upload(base64);
                return respuesta.url;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.ServicioCloudinaryArchivo = ServicioCloudinaryArchivo;
