import {describe, it} from 'mocha';
import {expect} from 'chai';
import {faker} from '@faker-js/faker'

import {ValidadorCrearColaborador, Comando} from '../../../../src/aplicacion/caracteristicas/usuario/crearColaborador'

describe('Validar datos del registro usuario',()=>{

  it('Ingresar datos correctos',async ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "0983334657",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    expect(sut.isValid()).to.equal(true);
  });

  it('No debería permitir un nombre vacío',()=>{
    const comando:Comando = {
      nombre:"",
      apellido: "Méndez Loor",
      telefono: "0983334657",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "nombre")).to.not.undefined;
  });

  it('El nombre al menos debería tener 2 caracteres', ()=>{
    const comando:Comando = {
      nombre:"J",
      apellido: "Méndez Loor",
      telefono: "0983334657",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "nombre")).to.not.undefined;
  })

  it('El nombre no debería tener más de 50 caracteres', ()=>{
    
    const comando:Comando = {
      nombre: faker.lorem.words(25),
      apellido: "Méndez Loor",
      telefono: "0983334657",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "nombre")).to.not.undefined;
  })
  
    
  it('No debería permitir un apellido vacío',()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "",
      telefono: "0983334657",
      email:"luisjoel@gmail.com",
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "apellido")).to.not.undefined;
  });

  it('El apellido al menos debería tener 2 caracteres', ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "M",
      telefono: "0983334657",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "apellido")).to.not.undefined;
  })

  it('El apellido no debería tener más de 50 caracteres', ()=>{
    
    const comando:Comando = {
      nombre: "Luis Joel",
      apellido: faker.lorem.words(25),
      telefono: "0983334657",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "apellido")).to.not.undefined;
  })

  it('El telefono no debería estar vacío',()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "telefono")).to.not.undefined;
  });

  it('El telefono debería aceptar tipos válidos | retorna error',()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "skdjfndkjsn",
      email:"luisjoel@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "telefono")).to.not.undefined;
  });

  it('El telefono debería aceptar tipos válidos | NO retorna error',()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "593983334657",
      email:"luisjoel@gmail.com",
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isValid()).to.equal(true);
  });

  it('El email no debería esta vacío', ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "0983335648",
      email:"", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "email")).to.not.undefined;
  })

  it('El email deberia tener el formato correcto', ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "0983335648",
      email:"soy un email", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "email")).to.not.undefined;
  })

  it('El rol no debería esta vacío | devuelve error', ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "0983335648",
      email:"luisj@gmail.com", 
      rol:"", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "rol")).to.not.undefined;
  })

  it('El rol es enum(cocinero,administrador) | devuelve error', ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "0983335648",
      email:"luisj@gmail.com", 
      rol:"persona", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "rol")).to.not.undefined;
  })

  it('El rol es enum(cocinero,administrador) ingresamos un cocinero | NO devuelve error', ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "0983335648",
      email:"luisj@gmail.com", 
      rol:"cocinero", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isValid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "rol")).to.undefined;
  })

  it('El rol es enum(cocinero,administrador) ingresamos un administrador | No devuelve error', ()=>{
    const comando:Comando = {
      nombre:"Luis Joel",
      apellido: "Méndez Loor",
      telefono: "0983335648",
      email:"luisj@gmail.com", 
      rol:"administrador", 
    }
    const validador = new ValidadorCrearColaborador();
    const sut = validador.validate(comando);
    
    expect(sut.isValid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "rol")).to.undefined;
  })

})