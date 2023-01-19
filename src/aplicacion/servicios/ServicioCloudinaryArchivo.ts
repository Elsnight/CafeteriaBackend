import {IServicioArchivo} from '../comunes/interfaces/IServicioArchivo';
import {v2 as cloudinary} from 'cloudinary'

export class ServicioCloudinaryArchivo implements IServicioArchivo{
  
  constructor(){
    cloudinary.config({ 
      cloud_name: 'dtim15nqh', 
      api_key: '648621655632133', 
      api_secret: 'mBWAvenJC_KiKKVHFZASHYcQDh4' 
    });
  }

  async subir(base64: string): Promise<string | null> {
    try {
      const respuesta = await cloudinary.uploader.upload(base64)
      return respuesta.url;
    } catch (error : any) {
      return null;
    }
  }
}