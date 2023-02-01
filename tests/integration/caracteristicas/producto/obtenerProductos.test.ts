import mongoose from 'mongoose';

import { describe, it, before } from 'mocha';
import { expect } from 'chai';

import { ObtenerProductos } from '../../../../src/aplicacion/caracteristicas/producto';
import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import { ProductoFactory } from '../../comunes/factory/producto.factory';
import { contenedor } from '../../../../src/infraestructura/dependencias';

const obtenerProductos = contenedor.resolve<ObtenerProductos>('obtenerProductos');
const contexto = new Contexto();

describe('Obtener Productos', async () => {
  before(async () => {
    await mongoose.connect("mongodb+srv://Eduardo:B0SvlmpDIOORrM8C@cluster0.qymjeqf.mongodb.net/?retryWrites=true&w=majority");
  })

  after(async () => {
    await contexto.Producto.deleteMany({});
    await mongoose.disconnect()
  })

  it('Obtener Productos debería retornar un array de productos', async () => {
    await contexto.Producto.create(ProductoFactory.crearProductos(10));
    const sut = await obtenerProductos.ejecutar();
    expect(sut.length).to.equal(10);
  })
})