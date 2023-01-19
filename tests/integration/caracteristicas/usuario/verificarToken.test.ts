import mongoose from 'mongoose'

import {describe, it, before} from 'mocha';
import chai,{expect} from 'chai';
import chaiAsPromised from 'chai-as-promised'
import {sign} from 'jsonwebtoken'

import {Login} from '../../../../src/aplicacion/caracteristicas/usuario/login'
import {contenedor} from '../../../../src/infraestructura/dependencias'
import { Contexto } from '../../../../src/aplicacion/persistencia/contexto';
import { ErrorServer } from '../../../../src/aplicacion/comunes/expeciones/error';
import {Registrar} from '../../../../src/aplicacion/caracteristicas/usuario/registrar'
import { VerificarToken } from '../../../../src/aplicacion/caracteristicas/usuario/verificarToken';
import { SECRET } from '../../../../src/infraestructura/config';

chai.use(chaiAsPromised);
const contexto = new Contexto();
const login = contenedor.resolve<Login>('login');
const registrar = contenedor.resolve<Registrar>('registrar')
const verificarToken = contenedor.resolve<VerificarToken>('verificarToken')

describe('Verificar token', async()=>{

  before(async()=>{
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.zk7c2.mongodb.net/Restaurantedb_TEST?retryWrites=true&w=majority");
  })

  after(async()=>{
    await contexto.Usuario.deleteMany({});
    await mongoose.disconnect()
  })

  it('Enviar token vacío | retorna error',async()=>{
    await expect(verificarToken.ejecutar({})).to.be.rejectedWith(ErrorServer,"El token no puede estar vacío!");
  })
  
  it('Enviar token caducado | retorna error',async()=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjY2I3NWE1LTFiYTYtNDViZi1iOTY0LTBhYzYwN2MzNzU0MiIsImlhdCI6MTY3MDgwNDYyOCwiZXhwIjoxNjcwODA0NjI4fQ.EoynhK5JMPpVFrQxoxlbpQDbPjz5z2YFb3WvrNLH8kA"; 
    await expect(verificarToken.ejecutar({token})).to.be.rejectedWith(ErrorServer,"El token ha expirado!");
  })

  it('Enviar token mal formado | retorna error', async()=>{
    const token = 'Hola123';
    await expect(verificarToken.ejecutar({token})).to.be.rejectedWith(ErrorServer,"El token no tiene el formato correcto!");
  })

  it('Enviar token de un usuario que no existe | retorna error', async()=>{
    const token = sign({id:'7621320a-04b6-49ff-b007-d83121f23908'},SECRET!,{expiresIn:'1h'});
    await expect(verificarToken.ejecutar({token})).to.be.rejectedWith(ErrorServer,"El token no coincide con ningún usuario!");
  })

  it('Enviar token de un usuario que no tiene la propiedad id | retorna error', async()=>{
    const token = sign({email:'joel@gmail.com'},SECRET!,{expiresIn:'1h'});
    await expect(verificarToken.ejecutar({token})).to.be.rejectedWith(ErrorServer,"El token no esta codificado correctamente!");
  })

  it('Enviar token correcto | retorna DTO', async()=>{
    const usuario = {
      nombre: 'Luis TEST',
      apellido: 'Méndez Loor',
      telefono: '0983336558',
      email: 'luisjoel@gmail.com',
      password: '12345678',
      rol: 'cliente'
    }
    await contexto.Usuario.deleteMany({});
    await registrar.ejecutar(usuario);
    const {token} = await login.ejecutar({email:usuario.email, password: usuario.password});
    
    const sut = await verificarToken.ejecutar({token});
    expect(sut).to.all.keys(['id','nombre','apellido','telefono','email','rol','urlFoto','fechaCreacion','token'])    
  })
})
