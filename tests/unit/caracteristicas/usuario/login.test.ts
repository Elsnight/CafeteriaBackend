import {describe, it} from 'mocha'
import chai,{expect} from 'chai'
import chaiJWT from 'chai-jwt'

import {v4 as uuid} from 'uuid'

import {ValidadorLogin, Comando, Login} from '../../../../src/aplicacion/caracteristicas/usuario/login'
import { contenedor } from '../../../../src/infraestructura/dependencias'

chai.use(chaiJWT)

const login = contenedor.resolve<Login>('login');

describe('Validar datos del login', ()=>{
  const validador = new ValidadorLogin()

  it('Ingresar datos correctos | no retorna error',()=>{
    const comando:Comando = {
      email: 'luisjo3lml@gmail.com',
      password: '12345678'
    }
    const sut = validador.validate(comando)
    
    expect(sut.isValid()).to.true;
  })

  it('Ingresar email vacío | retorna error', ()=>{
    const comando:Comando = {
      email: '',
      password: '12345678'
    }
    const sut = validador.validate(comando)

    expect(sut.isInvalid()).to.true;
    expect(sut.getFailures().find(x => x.propertyName == "email")).to.not.undefined;
    expect(sut.getFailures().find(x => x.propertyName == "email")?.message).to.equal('El email no es válido!');
  })

  it('Ingresar email incorrecto | retorna error', ()=>{
    const comando:Comando = {
      email: 'luisjogmailcom',
      password: '12345678'
    }
    const sut = validador.validate(comando)

    expect(sut.isInvalid()).to.true;
    expect(sut.getFailures().find(x => x.propertyName == "email")).to.not.undefined;
    expect(sut.getFailures().find(x => x.propertyName == "email")?.message).to.equal('El email no es válido!');
  })

  it('Ingresar password vacío | retorna error', ()=>{
    const comando:Comando = {
      email: 'luisjo@gmail.com',
      password: ''
    }
    const sut = validador.validate(comando)

    expect(sut.isInvalid()).to.true;
    expect(sut.getFailures().find(x => x.propertyName == "password")).to.not.undefined;
    expect(sut.getFailures().find(x => x.propertyName == "password")?.message).to.equal('El password no es válido!');
  })

  it('Ingresar password con menos de 8 carcateres | retorna error', ()=>{
    const comando:Comando = {
      email: 'luisjo@gmail.com',
      password: '1234'
    }
    const sut = validador.validate(comando)

    expect(sut.isInvalid()).to.true;
    expect(sut.getFailures().find(x => x.propertyName == "password")).to.not.undefined;
    expect(sut.getFailures().find(x => x.propertyName == "password")?.message).to.equal('El password no es válido!');
  })
})

describe('Generar JWT', ()=>{

  it('Debería contener el id | retorna JWT', ()=>{
    const token = login.generarToken(uuid())
    expect(token).to.be.jwt.and.have.claim('id')
  })
})