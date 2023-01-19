import {Response} from 'express'

export const ejecutarError = (res:Response, error: Error | any)=>{
  
  res.status(error.status ?? 402)
    .json({
      message: error.message ?? 'Error en el servidor!',
      ...error
    })
  }