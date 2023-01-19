import {describe, it} from 'mocha'
import chai,{expect} from 'chai'
import chaidUuid from 'chai-uuid'

import {Usuario} from '../../../src/aplicacion/dominio/entidades/usuario';

chai.use(chaidUuid);

describe('Tests Usuario', ()=>{

  it('Obtener id retorna uuid',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.id).to.a.uuid('v4');
  })

  it('Obtener nombre retorna string',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.nombre).to.equal("Joel")
  })

  it('Obtener apellido retorna string',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.apellido).to.equal('Méndez');
  })

  it('Obtener telefono retorna string',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.telefono).to.equal('0983335658');
  })

  it('Obtener email retorna string',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.email).to.equal('joel@gmail.com');
  })

  it('Obtener password retorna string',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.password).to.equal('12345678');
  })

  it('Obtener rol retorna string',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.rol).to.equal('cliente');
  })

  it('Obtener urlFoto retorna null',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.urlFoto).to.null;
  })

  it('Obtener urlFoto retorna string',()=>{
    const url:string = "http://foto.com/nombre.png";
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente",url);
    expect(usuario.urlFoto).to.equal(url);
  })

  it('Obtener fechaCreacion retorna Date por defecto',()=>{
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente");
    expect(usuario.fechaCreacion).to.instanceOf(Date);
  })

  it('Obtener fechaCreacion retorna Date',()=>{
    const fechaEsperada = new Date();
    const usuario = new Usuario("Joel","Méndez","0983335658","joel@gmail.com","12345678","cliente","http://foto.com/nombre.png",fechaEsperada);
    expect(usuario.fechaCreacion).to.equal(fechaEsperada);
  })
})
