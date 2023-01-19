import { AbstractValidator } from 'fluent-ts-validator';
import { ErrorServer } from '../../comunes/expeciones/error';
import {Contexto} from '../../persistencia/contexto'
import {Producto} from  '../../dominio/entidades/producto'

export interface AgregarProductoResponse{
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  fechaCreacion: Date;
}

export interface AgregarProductoRequest{
  nombre: string;
  precio: number;
  stock: number;
}

export class AgregarProducto{
  private contexto:Contexto;
  
  constructor(dependecias:{contexto:Contexto}){
    this.contexto = dependecias.contexto;
  }

  async ejecutar(request:AgregarProductoRequest):Promise<AgregarProductoResponse>{
    this.validarCampos(request);
    
    const producto = await this.contexto.Producto.create(new Producto(request.nombre, request.precio, request.stock));

    return{
      id: producto.id,
      nombre: producto.nombre!,
      precio: producto.precio!,
      stock: producto.stock!,
      fechaCreacion: producto.fechaCreacion!
    }
  }

  private validarCampos(request:AgregarProductoRequest){
    const resultado = new ValidadorAgregarProducto().validate(request)
    if(resultado.isInvalid()){
      throw new ErrorServer('Campos incorrectos!',400,resultado.getFailureMessages())
    }
  }
}

export class ValidadorAgregarProducto extends AbstractValidator<AgregarProductoRequest>{
  constructor(){
    super();
    this.validateIfString(x => x.nombre)
      .isNotEmpty()
      .withFailureMessage("El nombre no es válido")

    this.validateIfNumber(x => x.precio)
      .isNotEmpty()
      .isGreaterThan(0)
      .withFailureMessage('El precio no es válido!');

      this.validateIfNumber(x => x.stock)
      .isNotEmpty()
      .isGreaterThan(0)
      .withFailureMessage('El stock no es válido!');
  }
}