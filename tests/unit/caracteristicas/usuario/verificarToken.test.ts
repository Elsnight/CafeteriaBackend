import {describe, it} from 'mocha'
import {expect} from 'chai'
import {ValidadorVerificarToken} from '../../../../src/aplicacion/caracteristicas/usuario/verificarToken'


describe('Validar token',()=>{

  it('Enviar token vacío | retorna error', async()=>{
    const validador = new ValidadorVerificarToken();
    const sut = validador.validate({token:''});
    expect(sut.isInvalid()).to.true;        
  })
})
