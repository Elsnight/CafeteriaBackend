import mongoose from 'mongoose'

import {describe, it, before} from 'mocha';
import chai,{expect} from 'chai';
import chaiAsPromised from 'chai-as-promised'

import {EliminarProducto} from  '../../../../src/aplicacion/caracteristicas/producto';
import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import {ProductoFactory} from '../../comunes/factory/producto.factory';
import { contenedor } from '../../../../src/infraestructura/dependencias';
import { ErrorServer } from '../../../../src/aplicacion/comunes/expeciones/error';

chai.use(chaiAsPromised);

const eliminarProducto = contenedor.resolve<EliminarProducto>('eliminarProducto');
const contexto = new Contexto();

describe('Eliminar Producto', async()=>{
  before(async()=>{
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.zk7c2.mongodb.net/Restaurantedb_TEST?retryWrites=true&w=majority");
  })

  after(async()=>{
    await mongoose.disconnect();
  })

  it('Eliminar producto debería retornar el producto',async () => {
    const producto = ProductoFactory.crearProducto();
    await contexto.Producto.create(producto);
    const sut = await eliminarProducto.ejecutar(producto.id);
    expect(sut).to.have.all.keys(['id','nombre','precio','stock','fechaCreacion']);
  });

  it('Eliminar producto con id inexistente | retorna error', async()=>{
    await expect(eliminarProducto.ejecutar("IUHDBIGbhbhBJH")).to.be.rejectedWith(ErrorServer,"El id no existe!");
  })
})
