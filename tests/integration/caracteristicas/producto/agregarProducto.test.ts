import mongoose from 'mongoose'

import {describe, it, before} from 'mocha';
import chai,{expect} from 'chai';
import chaiAsPromised from 'chai-as-promised'

import {AgregarProducto} from  '../../../../src/aplicacion/caracteristicas/producto'
import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import {ProductoFactory} from '../../comunes/factory/producto.factory'
import { contenedor } from '../../../../src/infraestructura/dependencias';
import { ErrorServer } from '../../../../src/aplicacion/comunes/expeciones/error';

chai.use(chaiAsPromised);

const agregarProducto = contenedor.resolve<AgregarProducto>('agregarProducto');
const contexto = new Contexto();

describe('Agregar Producto', async()=>{
  before(async()=>{
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.zk7c2.mongodb.net/Restaurantedb_TEST?retryWrites=true&w=majority");
  })

  after(async()=>{
    await contexto.Producto.deleteMany({});
    await mongoose.disconnect();
  })

  it('Agregar producto debería retornar el producto ingresado',async () => {
    const {nombre, stock, precio} = ProductoFactory.crearProducto();
    const sut = await agregarProducto.ejecutar({nombre, stock, precio});
    expect(sut).to.have.all.keys(['id','nombre','precio','stock','fechaCreacion']);
  });

  it('Ingresar usuario con campos vacios | retorna error', async()=>{
    await expect(agregarProducto.ejecutar({} as any)).to.be.rejectedWith(ErrorServer,"Campos incorrectos!");
  })
})