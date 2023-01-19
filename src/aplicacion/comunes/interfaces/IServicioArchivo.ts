
export interface IServicioArchivo{
  subir(base64:string):Promise<string | null>;
}
