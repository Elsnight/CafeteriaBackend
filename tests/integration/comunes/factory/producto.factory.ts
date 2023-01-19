import {faker} from '@faker-js/faker'
import { Producto } from '../../../../src/aplicacion/dominio/entidades/producto';

faker.locale = 'es_MX'

export class ProductoFactory{

  static crearProductos(cantidad:number){
    let productos:Producto[] = [];
    for (let i = 0; i < cantidad; i++) {
      productos.push(this.crearProducto());      
    }
    return productos;
  }

  static crearProducto(){
    return new Producto(
      faker.commerce.product(),
      faker.commerce.price() as any,
      Math.floor(Math.random()*100+1)
    );
  }
  
}