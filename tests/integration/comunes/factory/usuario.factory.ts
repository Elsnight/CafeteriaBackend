import {faker} from '@faker-js/faker'
import { Usuario } from '../../../../src/aplicacion/dominio/entidades/usuario';

faker.locale = 'es_MX'

export class UsuarioFactory{
  static crearUsuarios(cantidad:number, roles:string[]){
    let usuarios:any[] = [];
    for (let i = 0; i < cantidad; i++) {
      usuarios.push(this.crearUsuario(roles));      
    }
    return usuarios;
  }

  static crearUsuario(roles:string[]){
    return new Usuario(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.phone.number('##########'),
      faker.internet.email(),
      faker.internet.password(10),
      roles[Math.floor(Math.random() * roles.length)]
    );
  }
}