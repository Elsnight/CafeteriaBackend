import mongoose from 'mongoose'

import { describe, it, before } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised'

import { CrearColaborador, Comando } from '../../../../src/aplicacion/caracteristicas/usuario/crearColaborador'
import { ServicioMockArchivo } from '../../comunes/services/servicioMockArchivo';
import { ServicioMockEmail } from '../../comunes/services/ServicioMockEmail';

import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import { ErrorServer } from '../../../../src/aplicacion/comunes/expeciones/error';
import { UsuarioFactory } from '../../comunes/factory/usuario.factory'

chai.use(chaiAsPromised);
const contexto = new Contexto();
const crearColaborador = new CrearColaborador({ contexto, servicioArchivo: new ServicioMockArchivo(), servicioEmail: new ServicioMockEmail() })
const roles = ['administrador', 'cocinero'];

describe('Crear Colaborador', async () => {
  before(async () => {
    await mongoose.connect("mongodb+srv://Eduardo:B0SvlmpDIOORrM8C@cluster0.qymjeqf.mongodb.net/?retryWrites=true&w=majority");
  })

  after(async () => {
    await contexto.Usuario.deleteMany({});
    await mongoose.disconnect()
  })

  it('Ingresar usuario con campos correctos | retorna DTO', async () => {
    const comando: Comando = { ...UsuarioFactory.crearUsuario(roles) }
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(UsuarioFactory.crearUsuarios(10, roles))
    const sut = await crearColaborador.ejecutar(comando);
    expect(sut).to.have.all.keys(['id', 'nombre', 'apellido', 'telefono', 'email', 'rol', 'urlFoto', 'fechaCreacion']);
  });

  it('Ingresar usuario con campos vacios | retorna error', async () => {
    await expect(crearColaborador.ejecutar({})).to.be.rejectedWith(ErrorServer, "Campos incorrectos!");
  })

  it('Ingresar un usuario con email existente | retorna error', async () => {
    const comando: Comando = { ...UsuarioFactory.crearUsuario(roles) }
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(comando);
    await expect(crearColaborador.ejecutar(comando)).to.be.rejectedWith(ErrorServer, "El email ya está registrado!");
  });

  it('Si enviamos la fotoBase64 debería retornar la url de la foto', async () => {
    const usuario: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336556',
      email: 'admin@gmail.comando',
      rol: 'cocinero',
      fotoBase64: 'base64,KJBSDCBjghabcfkugUYGUKFHUYg'
    }
    const sut = await crearColaborador.ejecutar(usuario)
    expect(sut.urlFoto).to.not.null;
  })
})