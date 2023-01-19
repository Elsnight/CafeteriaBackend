
export interface IServicioEmail{
  enviarEmail(para:string, mensaje:string, asunto:string):Promise<boolean>;
}