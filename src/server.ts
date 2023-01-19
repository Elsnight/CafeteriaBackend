import express,{ Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"

import swaggerExpress from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import {PORT} from './infraestructura/config'
import {conectar} from './infraestructura/db/mongo'
import { swaggerOptions } from "./infraestructura/docs/swaggerOptions"

import usuarioRouter from './infraestructura/routes/usuario.routes'
import productoRouter from './infraestructura/routes/producto.routes'
import componenteRouter from './infraestructura/routes/componente.routes'
import menuRouter from './infraestructura/routes/menu.routes';
import pedidoRouter from './infraestructura/routes/pedido.routes'

export class Server{
  private app

  constructor(){
    this.app = express()
    conectar();
    this.configuration()
    this.middlewares()
    this.routes()
  }

  private routes() {
    this.app.get('/',(req:Request, res:Response)=>{
      res.json({
        name:'REST API - RESTAURANTE'
      })
    })

    this.app.use('/api/usuario',usuarioRouter);
    this.app.use('/api/producto', productoRouter);
    this.app.use('/api/componente',componenteRouter);
    this.app.use('/api/menu', menuRouter);
    this.app.use('/api/pedido', pedidoRouter)
  }
  
  private middlewares() {
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(express.json({limit: '50mb'}))
  }

  private configuration() {
    this.app.set('port',PORT || 3000)

    const spec = swaggerJsDoc(swaggerOptions)
    this.app.use('/docs', 
      swaggerExpress.serve, 
      swaggerExpress.setup(spec))
  }

  listen(){
    this.app.listen(this.app.get('port'),()=>{
      console.log(`Server -> http://localhost:${this.app.get('port')}`); 
    })
  }
}