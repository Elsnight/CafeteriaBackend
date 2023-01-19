import {IServicioArchivo} from  '../../../../src/aplicacion/comunes/interfaces/IServicioArchivo'

export class ServicioMockArchivo implements IServicioArchivo{
  
  async subir(base64: string): Promise<string | null> {
    return "http://fake.com/KJHjkdkjKHJHbjhJ";
  }
}