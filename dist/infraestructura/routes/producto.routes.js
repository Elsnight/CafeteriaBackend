"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencias_1 = require("../dependencias");
const router = (0, express_1.Router)();
const productoController = dependencias_1.contenedor.resolve('productoController');
/**
 * @swagger
 * tags:
 *  name: Producto
 *  descripcion: Producto enpoints
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    ProductoResponse:
 *      type: Object
 *      properties:
 *        id:
 *          type: string
 *          description: Es un uuid version 4
 *        nombre:
 *          type: string
 *        precio:
 *          type: number
 *        stock:
 *          type: number
 *        fechaCreacion: Date
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        nombre: Botella de agua
 *        precio: 0.50
 *        stock: 50
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
 *    ProductoRequest:
 *      type: Object
 *      properties:
 *        nombre:
 *          type: string
 *        precio:
 *          type: number
 *        stock:
 *          type: number
 *      example:
 *        nombre: Botella de agua
 *        precio: 0.50
 *        stock: 50
*/
/**
 * @swagger
 * /api/producto:
 *  get:
 *    summary: Lista de productos
 *    tags: [Producto]
 *    description: Devuelve una lista de producto
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
 *                $ref: '#/components/schemas/ProductoResponse'
 */
router.get('/', productoController.getAll);
/**
 * @swagger
 * /api/producto:
 *  post:
 *    summary: Agregar producto
 *    tags: [Producto]
 *    description: Agregar producto
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
 *            $ref: '#components/schemas/ProductoRequest'
 *    responses:
 *      200:
 *        description: Retorna el producto ingresado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductoResponse'
 *      400:
 *        description: Devuelve un objeto de tipo Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/', productoController.create);
/**
 * @swagger
 * /api/producto/{id}:
 *  delete:
 *    summary: Eliminar producto
 *    tags: [Producto]
 *    description: Eliminar producto por el id
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
 *        description: Retorna el producto eliminado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductoResponse'
 *      400:
 *        description: Devuelve un objeto de tipo Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.delete('/:id', productoController.delete);
/**
 * @swagger
 * /api/producto/{id}:
 *  patch:
 *    summary: Actualizar producto
 *    tags: [Producto]
 *    description: Actualizar producto por el id
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
 *            $ref: '#components/schemas/ProductoRequest'
 *    responses:
 *      200:
 *        description: Retorna el producto actualizado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductoResponse'
 *      400:
 *        description: Devuelve un objeto de tipo Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.patch('/:id', productoController.update);
exports.default = router;
