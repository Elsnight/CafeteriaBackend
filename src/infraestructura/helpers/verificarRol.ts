import {ErrorServer} from '../../aplicacion/comunes/expeciones/error'


export const verificarRol = (rol:string, rolesPermitidos:string[])=>{
  if(rolesPermitidos.indexOf(rol) == -1){
    throw new ErrorServer(`El rol ${rol} no tiene permitido realizar esta acción!`)
  }
}