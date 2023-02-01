import mongoose from 'mongoose'

import { describe, it, before } from 'mocha';
import chai, { expect } from 'chai';

import { contenedor } from '../../../../src/infraestructura/dependencias'
import { ObtenerColaboradores } from '../../../../src/aplicacion/caracteristicas/usuario/obtenerColaboradores'
import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import { UsuarioFactory } from '../../comunes/factory/usuario.factory'

const obtenerColaboradores = contenedor.resolve<ObtenerColaboradores>('obtenerColaboradores');
const contexto = new Contexto();

describe('Obtener Colaboradores', async () => {
  before(async () => {
    await mongoose.connect("mongodb+srv://Eduardo:B0SvlmpDIOORrM8C@cluster0.qymjeqf.mongodb.net/?retryWrites=true&w=majority");
  })

  after(async () => {
    await contexto.Usuario.deleteMany({});
    await mongoose.disconnect()
  })

  it('Obtener Colaboradores debería retornar un array de usuarios', async () => {
    const roles = ['administrador', 'cocinero'];
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(UsuarioFactory.crearUsuarios(10, roles));
    const sut = await obtenerColaboradores.ejecutar();
    expect(sut.length).to.equal(10);
  })

  it('Obtener Colaboradores debería retornar un array de usuarios con rol administrador y conicero', async () => {
    const roles = ['administrador', 'cocinero', 'cliente'];
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(UsuarioFactory.crearUsuarios(10, roles));
    const sut = await obtenerColaboradores.ejecutar();
    expect(sut.filter(x => x.rol != 'administrador' && x.rol != 'cocinero').length).to.equal(0);
  })

})