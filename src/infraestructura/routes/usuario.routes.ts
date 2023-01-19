import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import {contenedor} from "../dependencias";

const router = Router();
const usuarioController = contenedor.resolve<UsuarioController>('usuarioController');

/**
 * @swagger
 * components:
 *  schemas:
 *    Usuario:
 *      type: Object
 *      properties:
 *        id:
 *          type: string
 *          description: Es un uuid version 4
 *        nombre:
 *          type: string
 *        apellido:
 *          type: string
 *        telefono:
 *          type: string
 *        email: 
 *          type: string
 *        rol:
 *          type: string
 *        fechaCreacion: Date
 *      required:
 *        - nombre
 *        - apellido
 *        - telefono
 *        - email
 *        - rol
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        nombre: Luis Joel
 *        apellido: Perez Loor
 *        telefono: "0983334657"
 *        email: luisjo3lml@gmail.com
 *        rol: cliente
 *        fechaCreacion: 2022-12-04T15:16:02.555Z
 *    Error:
 *      type: Object
 *      properties:
 *        message:
 *          type: string
 *        errors: 
 *          type: string[]
 *        status: 
 *          type: number
 *      example:
 *        message: 'Ya existe un administrador registrado!'
 *        errors: []
 *        status: 400
 *    Login:
 *      type: Object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      example:  
 *        email: eexample@gmail.com
 *        password: v123sdffA
 *    RespuestaLogin:
 *      type: Object
 *      properties:
 *        id:
 *          type: string
 *        nombre:
 *          type: string
 *        apellido:
 *          type: string
 *        telefono:
 *          type: string
 *        email:
 *          type: string
 *        rol:
 *          type: string
 *        fechaCreacion:
 *          type: Date
 *        token:
 *          type: string
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        nombre: Pedro
 *        apellido: Veliz Alvarez
 *        telefono: 0986645454
 *        email: pedro@gmail.com
 *        rol: cliente
 *        fechaCreacion: 2022-12-04T15:16:02.555Z
 *        token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InVwZGF0ZTpzb21ldGhpbmciLCJleHAiOjE0NzA3NjE3ODEsImlhdCI6MTQ3MDc2MDc5M30.1b4RC22Kpx4X4GWXU-Wgsk4IbeRGVD7tNW-tM-LzkVE
*    RespuestaColaborador:
 *      type: Object
 *      properties:
 *        id:
 *          type: string
 *        nombre:
 *          type: string
 *        apellido:
 *          type: string
 *        telefono:
 *          type: string
 *        email:
 *          type: string
 *        rol:
 *          type: string
 *        fechaCreacion:
 *          type: Date
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        nombre: Pedro
 *        apellido: Veliz Alvarez
 *        telefono: 0986645454
 *        email: pedro@gmail.com
 *        rol: cocinero
 *        fechaCreacion: 2022-12-04T15:16:02.555Z
 */

/**
 * @swagger
 * tags:
 *  name: Usuario
 *  descripcion: Usuario enpoints
 */

/**
 * @swagger
 * /api/usuario/colaboradores:  
 *  get:
 *    summary: Lista de colaboradores (administradores y cocineros)
 *    tags: [Usuario]
 *    description: Devuelve una lista de usuarios
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    responses:
 *      200:
 *        description: Retorna una lista de usuarios.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Usuario'     
 */
router.get('/colaboradores',usuarioController.getCollaborators);

/**
 * @swagger
 * /api/usuario/registro:
 *  post:
 *    summary: Registro de clientes y administrador
 *    tags: [Usuario]
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              nombre:string
 *              apellido:string
 *              telefono:string
 *              email:string
 *              password:string
 *              rol:string
 *              base64Foto:string
 *            example:
 *              nombre: Luis Joel
 *              apellido: Perez Loor
 *              telefono: "0983334657"
 *              email: luisjo3lml@gmail.com
 *              password: "12345678"
 *              rol: cliente        
 *              base64Foto: LJuhijniudhiuHIUhiUHiu      
 *    responses:
 *      200:
 *        description: Devuelve el usuario ingresado con el id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'                  
 */
router.post('/registro', usuarioController.create);

/**
 * @swagger
 * /api/usuario/login:
 *  post:
 *    summary: Login para todos los usuarios
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Devuelve todos los datos del usuario más el token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RespuestaLogin'
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'                  
 */
router.post('/login', usuarioController.signIn);

/**
 * @swagger
 * /api/usuario/verificar-token:
 *  put:
 *    summary: Verificar si el token sigue vigente
 *    tags: [Usuario]
 *    parameters:
 *      - in: query
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    responses:
 *      200:
 *        description: Devuelve todos los datos del usuario más el token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RespuestaLogin'
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'                  
 */
router.put('/verificar-token', usuarioController.verifyToken)

/**
 * @swagger
 * /api/usuario/crear-colaborador:
 *  post:
 *    summary: Crear un colaborador puede ser administrador o cocinero
 *    tags: [Usuario]
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              nombre:string
 *              apellido:string
 *              telefono:string
 *              email:string
 *              rol:string
 *              base64Foto:string
 *            example:
 *              nombre: Luis Joel
 *              apellido: Perez Loor
 *              telefono: "0983334657"
 *              email: luisjo3lml@gmail.com
 *              rol: cocinero     
 *    responses:
 *      200:
 *        description: Devuelve todos los datos del usuario más el token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RespuestaColaborador'
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'                  
 */
router.post('/crear-colaborador', usuarioController.createCollaborator)

/**
 * @swagger
 * /api/usuario/enviar-codigo-recuperar-password:
 *  post:
 *    summary: Enviar codigo de recuperar password al email
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              email: string
 *            example:
 *              email: luisjo3lml@gmail.com
 *    responses:
 *      200:
 *        description: Devuelve el email
 *        content:
 *          application/json:
 *            schema:
 *              type: Object
 *              properties:
 *                email: string
 *              example:
 *                email: luisjo3lml@gmail.com
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'                  
 */
router.post('/enviar-codigo-recuperar-password', usuarioController.sendCodeRecoveryPassword)

/**
 * @swagger
 * /api/usuario/recuperar-password:
 *  post:
 *    summary: Enviar codigo de recuperar password y el nuevo password
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              email: string
 *              codigo: string
 *              password: string
 *            example:
 *              email: luisjo3lml@gmail.com
 *              codigo: 123456
 *              password: 12345678
 *    responses:
 *      200:
 *        description: Devuelve el request
 *        content:
 *          application/json:
 *            schema:
 *              type: Object
 *              properties:
 *                email: string
 *                codigo: string
 *                password: string
 *              example:
 *                email: luisjo3lml@gmail.com
 *                codigo: 123456
 *                password: 12345678
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'                  
 */
router.post('/recuperar-password', usuarioController.recoveryPassword)

/**
 * @swagger
 * /api/usuario/{id}:  
 *  delete:
 *    summary: Eliminar usuario
 *    tags: [Usuario]
 *    description: Eliminar el usuairo por el id
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Retorna el usuario eliminado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RespuestaColaborador'     
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'     
 */
router.delete('/:id', usuarioController.delete);

/**
 * @swagger
 * /api/usuario/cocineros:  
 *  get:
 *    summary: Lista de cocineros
 *    tags: [Usuario]
 *    description: Devuelve una lista de cocineros, solo tiene accesso el administrador
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    responses:
 *      200:
 *        description: Retorna una lista de cocineros.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Usuario'     
 */
router.get('/cocineros', usuarioController.getConcineros);

/**
 * @swagger
 * /api/usuario/:
 *  patch:
 *    summary: Actualizar datos del usuario
 *    tags: [Usuario]
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              telefono: string
 *              fotoBase64: string
 *              password: string
 *            example:
 *              telefono: "0983534657"
 *              fotoBase64: KJHKHIhuyHIUhuYG
 *              password: 1234521JNkhb
 *    responses:
 *      200:
 *        description: Devuelve los datos del usuario
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'  
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'                  
 */
router.patch('/', usuarioController.update);

export default router;