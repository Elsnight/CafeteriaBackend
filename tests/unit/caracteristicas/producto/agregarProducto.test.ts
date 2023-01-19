import {describe, it} from 'mocha';
import {expect} from 'chai';


import {ValidadorAgregarProducto,AgregarProductoRequest} from '../../../../src/aplicacion/caracteristicas/producto'

describe('Validar agregar producto',()=>{
  
  it('Agregar campos correctos', ()=>{
    const producto:AgregarProductoRequest = {
      nombre:"Agua",
      precio: 12.5,
      stock: 100
    }
    const validador = new ValidadorAgregarProducto();
    const sut = validador.validate(producto);
    expect(sut.isValid()).to.equal(true);
  })

  it('No debería permitir un nombre vacío',()=>{
    const producto = {
      nombre:"",
      precio: 12.5,
      stock: 100
    }
    const validador = new ValidadorAgregarProducto();
    const sut = validador.validate(producto);
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "nombre")).to.not.undefined;
  });

  it('No debería permitir un precio negativo',()=>{
    const producto = {
      nombre:"dsdfv",
      precio: -12.5,
      stock: 100
    }
    const validador = new ValidadorAgregarProducto();
    const sut = validador.validate(producto);
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "precio")).to.not.undefined;
  });

  it('No debería permitir un precio con letras',()=>{
    const producto = {
      nombre:"dsdfv",
      precio: "fdgg",
      stock: 100
    }
    const validador = new ValidadorAgregarProducto();
    const sut = validador.validate(producto as any);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "precio")).to.not.undefined;
  });

  it('No debería permitir un stock negativo',()=>{
    const producto = {
      nombre:"dsdfv",
      precio: 12.5,
      stock: -100
    }
    const validador = new ValidadorAgregarProducto();
    const sut = validador.validate(producto);
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "stock")).to.not.undefined;
  });

  it('No debería permitir un stock con letras',()=>{
    const producto = {
      nombre:"dsdfv",
      precio: 12,
      stock: "sdfdf"
    }
    const validador = new ValidadorAgregarProducto();
    const sut = validador.validate(producto as any);
    
    expect(sut.isInvalid()).to.equal(true);
    expect(sut.getFailures().find(x => x.propertyName == "stock")).to.not.undefined;
  });
});