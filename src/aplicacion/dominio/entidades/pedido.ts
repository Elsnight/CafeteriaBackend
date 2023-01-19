import moment from 'moment'

export class Pedido{
  total: number;
  componentes: any[];
  productos: any[];
  urlComprobante: string;
  _cliente: string;
  estado: string[];
  fechaCreacion: Date

  constructor(total:number, urlComprobante:string, _cliente:string, componentes:any[], productos:any[]){
    this.total = total;
    this.componentes = componentes;
    this.productos = productos;
    this.urlComprobante = urlComprobante;
    this._cliente = _cliente;
    this.estado = ["pendiente"];
    this.fechaCreacion = new Date(moment().utc().format());
  }
}