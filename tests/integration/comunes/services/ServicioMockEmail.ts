import { IServicioEmail } from '../../../../src/aplicacion/comunes/interfaces/IServicioEmail'


export class ServicioMockEmail implements IServicioEmail {

    async enviarEmail(para: string, mensaje: string, asunto: string): Promise<boolean> {
        return true;
    }
}