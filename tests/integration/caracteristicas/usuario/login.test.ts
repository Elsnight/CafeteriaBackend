import mongoose from 'mongoose'

import { describe, it, before } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised'

import { Login, Comando } from '../../../../src/aplicacion/caracteristicas/usuario/login'
import { contenedor } from '../../../../src/infraestructura/dependencias'
import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import { ErrorServer } from '../../../../src/aplicacion/comunes/expeciones/error';
import { Registrar } from '../../../../src/aplicacion/caracteristicas/usuario/registrar'

chai.use(chaiAsPromised);
const contexto = new Contexto();
const login = contenedor.resolve<Login>('login');
const registrar = contenedor.resolve<Registrar>('registrar')

describe('Login usuario', async () => {
  before(async () => {
    await mongoose.connect("mongodb+srv://Eduardo:B0SvlmpDIOORrM8C@cluster0.qymjeqf.mongodb.net/?retryWrites=true&w=majority");
  })

  after(async () => {
    await contexto.Usuario.deleteMany({});
    await mongoose.disconnect()
  })

  it('Logeo exitoso | retorna usuario', async () => {
    const comando: Comando = { email: 'luisjoel@gmail.com', password: '12345678' }
    const usuario = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336558',
      email: 'luisjoel@gmail.com',
      password: '12345678',
      rol: 'cliente'
    }
    usuario.password = await registrar.encriptarPassword(usuario.password);
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(usuario);
    const sut = await login.ejecutar(comando);
    expect(sut).to.all.keys(['id', 'nombre', 'apellido', 'telefono', 'email', 'rol', 'urlFoto', 'fechaCreacion', 'token'])
  })

  it('Logearse con email inexistente | retorna error', async () => {
    const comando: Comando = { email: 'luisjoel@gmail.com', password: '12345678' }
    await contexto.Usuario.deleteMany({});
    await expect(login.ejecutar(comando)).to.be.rejectedWith(ErrorServer, "Credenciales incorrectas!");
  })

  it('Logearse con password incorrecto | retorna error', async () => {
    const comando: Comando = { email: 'luisjoel@gmail.com', password: '123456789' }
    const usuario = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336558',
      email: 'luisjoel@gmail.com',
      password: '12345678',
      rol: 'cliente'
    }
    usuario.password = await registrar.encriptarPassword(usuario.password);
    await contexto.Usuario.deleteMany({});
    await contexto.Usuario.create(usuario);
    await expect(login.ejecutar(comando)).to.be.rejectedWith(ErrorServer, "Credenciales incorrectas!");
  })

  it('Login con campos vacíos | retorna error', async () => {
    await expect(login.ejecutar({})).to.be.rejectedWith(ErrorServer, "Campos incorrectos!");
  })
})