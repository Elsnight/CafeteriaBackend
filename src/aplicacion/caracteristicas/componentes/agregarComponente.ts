import { AbstractValidator } from 'fluent-ts-validator';
import { ErrorServer } from '../../comunes/expeciones/error';
import {Contexto} from '../../persistencia/contexto';
import {Componente} from  '../../dominio/entidades/componente';
import { IServicioArchivo } from '../../comunes/interfaces/IServicioArchivo';

export interface AgregarComponenteResponse{
  id: string,
  nombre: string,
  descripcion: string,
  precio: number,
  medida: string,
  tipo: string,
  urlFoto: string | null,
  fechaCreacion: Date
}

export interface AgregarComponenteRequest{
  nombre: string,
  descripcion: string,
  precio: number,
  medida: string,
  tipo: string,
  base64Foto: string | null,
}

export class AgregarComponente{
  private contexto:Contexto;
  private servicioArchivo:IServicioArchivo;

  constructor(dependencias:{contexto:Contexto, servicioArchivo: IServicioArchivo}){
    this.contexto = dependencias.contexto;
    this.servicioArchivo = dependencias.servicioArchivo;
  }

  async ejecutar(request:AgregarComponenteRequest):Promise<AgregarComponenteResponse>{
    this.validarCampos(request);
    const {nombre, descripcion, precio, base64Foto, medida, tipo} = request;
    const componente = new Componente(nombre, descripcion,precio,medida,tipo);
    
    if(base64Foto){
      componente.urlFoto = await this.servicioArchivo.subir(base64Foto);
    }

    const componenteNuevo = await this.contexto.Componente.create(componente);

    return{
      id: componenteNuevo.id,
      nombre: componenteNuevo.nombre!,
      descripcion: componenteNuevo.descripcion!,
      precio: componenteNuevo.precio!,
      medida: componenteNuevo.medida!,
      tipo: componenteNuevo.tipo!,
      urlFoto: componenteNuevo.urlFoto!,
      fechaCreacion: componenteNuevo.fechaCreacion!
    }
  }

  private validarCampos(request:AgregarComponenteRequest){
    const resultado = new ValidadorAgregarComponente().validate(request)
    if(resultado.isInvalid()){
      throw new ErrorServer('Campos incorrectos!',400,resultado.getFailureMessages())
    }
  }
}

export class ValidadorAgregarComponente extends AbstractValidator<AgregarComponenteRequest>{
  constructor(){
    super();
    this.validateIfString(x => x.nombre)
      .isNotEmpty()
      .withFailureMessage("El nombre no es válido")

    this.validateIfString(x => x.descripcion)
      .isNotEmpty()
      .withFailureMessage("La descripcion no es válido")

    this.validateIfNumber(x => x.precio)
      .isNotEmpty()
      .isGreaterThan(0)
      .withFailureMessage('El precio no es válido!');

    this.validateIfString(x => x.medida)
      .isNotEmpty()
      .withFailureMessage("La medida no es válido")

    this.validateIfString(x => x.tipo)
      .isNotEmpty()
      .withFailureMessage("El tipo no es válido")
  }
}