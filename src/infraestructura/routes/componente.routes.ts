import { Router } from "express";
import { ComponenteController } from "../controllers";
import {contenedor} from "../dependencias";

const router = Router();

const componenteController = contenedor.resolve<ComponenteController>('componenteController');


/**
 * @swagger
 * tags:
 *  name: Componente
 *  descripcion: Componente enpoints
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ComponenteResponse:
 *      type: Object
 *      properties:
 *        id:
 *          type: string
 *          description: Es un uuid version 4
 *        nombre:
 *          type: string
 *        descripcion:
 *          type: string
 *        precio:
 *          type: number
 *        medida: 
 *          type: string
 *        tipo: string
 *        urlFoto: string
 *        fechaCreacion: Date
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        nombre: Menestra con carne
 *        descripcion: Menestra, arroz, carne y ensalada
 *        precio: 2.00
 *        medida: plato
 *        tipo: segundo
 *        urlFoto: string
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
 *        message: 'El token no puede estar vacío!'
 *        errors: []
 *        status: 400
 *    ComponenteRequest:
 *      type: Object
 *      properties:
 *        nombre:
 *          type: string
 *        descripcion:
 *          type: string
 *        precio:
 *          type: number
 *        medida: 
 *          type: string
 *        tipo: string
 *        base64Foto: string
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        nombre: Menestra con carne
 *        descripcion: Menestra, arroz, carne y ensalada
 *        precio: 2.00
 *        medida: plato
 *        tipo: segundo
 *        base64Foto: KJNKBHJhbjhdbjhbibiyh
 *    ComponenteRequestPatch:
 *      type: Object
 *      properties:
 *        nombre:
 *          type: string
 *        descripcion:
 *          type: string
 *        precio:
 *          type: number
 *        medida: 
 *          type: string
 *        tipo: string
 *      example:
 *        nombre: Menestra con carne
 *        descripcion: Menestra, arroz, carne y ensalada
 *        precio: 2.00
 *        medida: plato
 *        tipo: segundo
*/

/**
 * @swagger
 * /api/componente:  
 *  get:
 *    summary: Lista de componentes
 *    tags: [Componente]
 *    description: Devuelve una lista de componentes
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    responses:
 *      200:
 *        description: Retorna una lista de productos.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ComponenteResponse'     
 */
router.get('/', componenteController.getAll);

/**
 * @swagger
 * /api/componente:  
 *  post:
 *    summary: Agregar componente
 *    tags: [Componente]
 *    description: Agregar componente
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
 *            $ref: '#components/schemas/ComponenteRequest'
 *    responses:
 *      200:
 *        description: Retorna el componente ingresado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ComponenteResponse'     
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'     
 */
router.post('/', componenteController.create);

/**
 * @swagger
 * /api/componente/{id}:  
 *  delete:
 *    summary: Eliminar componente
 *    tags: [Componente]
 *    description: Eliminar componente
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
 *        description: Retorna el componente eliminado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ComponenteResponse'     
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'     
 */
router.delete('/:id', componenteController.delete);

/**
 * @swagger
 * /api/componente/{id}:  
 *  patch:
 *    summary: Actualizar componente
 *    tags: [Componente]
 *    description: Actualizar componente
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
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/ComponenteRequestPatch'
 *    responses:
 *      200:
 *        description: Retorna el componente actualizado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ComponenteResponse'     
 *      400:
 *        description: Devuelve un objeto de tipo Error  
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'     
 */
router.patch('/:id', componenteController.update);

export default router;