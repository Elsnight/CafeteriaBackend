
export class ErrorServer extends Error{
  errors:string[]
  status:number
  
  constructor(message?:string, status?: number, errors?:string[]){
    super(message || 'Error en el servidor!');
    this.errors = errors ?? [];
    this.status = 400;
  }
}