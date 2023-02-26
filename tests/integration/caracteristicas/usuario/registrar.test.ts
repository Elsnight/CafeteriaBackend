import mongoose from 'mongoose'

import { describe, it, before } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised'

import { Registrar, Comando } from '../../../../src/aplicacion/caracteristicas/usuario/registrar'
import { ServicioMockArchivo } from '../../comunes/services/servicioMockArchivo'
import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import { ErrorServer } from '../../../../src/aplicacion/comunes/expeciones/error';

chai.use(chaiAsPromised);
const contexto = new Contexto();
const registrar = new Registrar({ contexto, servicioArchivo: new ServicioMockArchivo() });

describe('Registrar usuario', async () => {
  before(async () => {
    await mongoose.connect("mongodb+srv://Eduardo:B0SvlmpDIOORrM8C@cluster0.qymjeqf.mongodb.net/?retryWrites=true&w=majority");
    await contexto.Usuario.deleteMany({});
  })

  it('Ingresar usuario', async () => {
    const comando: Comando = {
      nombre: 'Ana C',
      apellido: 'Machado Velez',
      telefono: '0983336558',
      email: 'Velez@gmail.con',
      password: '12345678',
      rol: 'cliente'
    }
    const sut = await registrar.ejecutar(comando);
    expect(sut).to.have.all.keys(['id', 'nombre', 'apellido', 'telefono', 'email', 'rol', 'urlFoto', 'fechaCreacion']);
  });

  it('Ingresar usuario con campos vacios | retorna error', async () => {
    await expect(registrar.ejecutar({})).to.be.rejectedWith(ErrorServer, "Campos incorrectos!");
  })

  it('Ingresar usuario con email existente | retorna error', async () => {
    const comando: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336558',
      email: 'joel@gmail.comando',
      password: '12345678',
      rol: 'cliente'
    }
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(comando);
    await expect(registrar.ejecutar(comando)).to.be.rejectedWith(ErrorServer, "El email ya está registrado!");
  });

  it('Debería permitir el registro solo de un administrador | retorna error', async () => {
    const admin1: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336556',
      email: 'admin@gmail.com',
      password: '12345678',
      rol: 'administrador'
    }
    const admin2: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336558',
      email: 'joel@gmail.com',
      password: '12345678',
      rol: 'administrador'
    }
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(admin1);
    await expect(registrar.ejecutar(admin2)).to.be.rejectedWith(ErrorServer, "Ya existe un administrador registrado!");
  })

  it('Debería permitir el registro solo de un administrador | NO retorna error', async () => {
    const admin1: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336556',
      email: 'admin@gmail.comando',
      password: '12345678',
      rol: 'administrador'
    }
    await contexto.Usuario.deleteMany({});
    await expect(registrar.ejecutar(admin1)).to.be.not.rejectedWith(ErrorServer);
  })

  it('Debería permitir el registro de un cliente | NO retorna error', async () => {
    const admin1: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336556',
      email: 'admin@gmail.com',
      password: '12345678',
      rol: 'administrador'
    }
    const cliente: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336558',
      email: 'joel@gmail.com',
      password: '12345678',
      rol: 'cliente'
    }
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(admin1);
    await expect(registrar.ejecutar(cliente)).to.be.not.rejectedWith(ErrorServer);
  })

  it('Si enviamos la fotoBase64 debería retornar la url de la foto', async () => {
    const usuario: Comando = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336556',
      email: 'admin@gmail.comando',
      password: '12345678',
      rol: 'cliente',
      fotoBase64: 'base64,KJBSDCBjghabcfkugUYGUKFHUYg'
    }
    const sut = await registrar.ejecutar(usuario)
    expect(sut.urlFoto).to.not.null;
  })

  after(async () => {
    await contexto.Usuario.deleteMany({});
    await mongoose.disconnect()
  })
})