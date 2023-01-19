import {createTransport, Transporter} from 'nodemailer';

import { IServicioEmail } from "../comunes/interfaces/IServicioEmail";
import {EMAIL_PASSWORD, EMAIL_USER} from '../../infraestructura/config'

export class ServicioEmail implements IServicioEmail{
  private transporte: Transporter;

  constructor(){
    this.transporte = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER, 
        pass: EMAIL_PASSWORD
      }
    });
    this.transporte.verify()
    .then(()=>{
      console.log('Email verificado!');      
    })
  }
  
  async enviarEmail(para: string, mensaje: string, asunto: string): Promise<boolean> {
    try {
      await this.transporte.sendMail({
        from: `<${EMAIL_USER}>`,
        to: para,
        subject: asunto,
        html: mensaje
      });
      return true;
    } catch (error) {
      return false;      
    }
  }
}