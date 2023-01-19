import { Pedido } from "../../dominio/entidades/pedido";
import { Contexto } from '../../persistencia/contexto';
import {ErrorServer} from '../../comunes/expeciones/error';
import { IServicioArchivo } from '../../comunes/interfaces/IServicioArchivo';

export class AgregarPedido{
  private contexto:Contexto;
  private servicioArchivo:IServicioArchivo;

  constructor(dependencias:{contexto:Contexto, servicioArchivo: IServicioArchivo}){
    this.contexto = dependencias.contexto;
    this.servicioArchivo = dependencias.servicioArchivo;
  }

  async ejecutar(request:any){
    const urlComprobante = await this.servicioArchivo.subir(request.base64Comprobante);
    if(!urlComprobante){
      throw new ErrorServer('Debe envíar la foto del comprobante')
    }

    const pedido = new Pedido(request.total, urlComprobante, request._cliente, request.componentes, request.productos);
    
    pedido.productos.forEach(async(x:any) => {
      const producto = await this.contexto.Producto.findById(x._producto);
      producto!.stock! -= x.cantidad;
      await producto!.save();
    });

    const nuevoPedido = await this.contexto.Pedido.create(pedido);
    return nuevoPedido;
  }
}
