import {Contexto} from '../../persistencia/contexto'
import {IServicioEmail} from '../../comunes/interfaces/IServicioEmail'
import {ErrorServer} from '../../comunes/expeciones/error'

interface IRequest{
  email: string;
}

export class EnviarCodigoRecuperarPassword{
  private contexto:Contexto;
  private servicioEmail: IServicioEmail;

  constructor(dependencias:{contexto:Contexto, servicioEmail:IServicioEmail}){
    this.contexto = dependencias.contexto;
    this.servicioEmail = dependencias.servicioEmail;
  }

  async ejecutar(request: IRequest){
    const usuario = await this.contexto.Usuario.findOne({email: request.email});
    if(!usuario){
      throw new ErrorServer('Datos incorrectos!');
    }

    usuario.codigo = this.generarCodigo();
    await this.servicioEmail.enviarEmail(
      request.email, 
      `<h2>Código para recuperar la contraseña</h2>
      <br>
      <p>Código: <strong>${usuario.codigo}</strong></p>`,
      'Recuperar contraseña')
    await usuario.save();

    return {
      email: request.email
    }
  }

  private generarCodigo():string{
    let codigo:string = "";
    for (let i = 0; i < 6; i++) {
      codigo += Math.floor(Math.random()*9+1)    
    }
    return codigo;
  }
}