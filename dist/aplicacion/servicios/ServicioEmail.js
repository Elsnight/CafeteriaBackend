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
exports.ServicioEmail = void 0;
const nodemailer_1 = require("nodemailer");
const config_1 = require("../../infraestructura/config");
class ServicioEmail {
    constructor() {
        this.transporte = (0, nodemailer_1.createTransport)({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config_1.EMAIL_USER,
                pass: config_1.EMAIL_PASSWORD
            }
        });
        this.transporte.verify()
            .then(() => {
            console.log('Email verificado!');
        });
    }
    enviarEmail(para, mensaje, asunto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporte.sendMail({
                    from: `<${config_1.EMAIL_USER}>`,
                    to: para,
                    subject: asunto,
                    html: mensaje
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.ServicioEmail = ServicioEmail;
