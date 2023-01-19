"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencias_1 = require("../dependencias");
const router = (0, express_1.Router)();
const pedidoController = dependencias_1.contenedor.resolve('pedidoController');
/**
 * @swagger
 * components:
 *  schemas:
 *    PedidoResponse:
 *      type: Object
 *      properties:
 *        _id:
 *          type: string
 *        total:
 *          type: number
 *        componentes: array
 *        productos: array
 *        base64Comprobante: string
 *        _cliente: string
 *        fechaCreacion: Date
 *      example:
 *        _id: 638cb9c5959e03572e1e7309
 *        total: 24.50
 *        componentes: [{"_componente":"oihdfkvjndiufvh", "cantidad":2}]
 *        productos: [{"_producto":"oihdfkvjndiufvh", "cantidad":3}]
 *        base64Comprobante: KAUHDIUHBJygaYGUHGUYGU
 *        _cliente: 638cb9c5959e03572e1e7309
 *        fechaCreacion: 2022-12-04T15:16:02.555Z
 *    PedidoRequest:
 *      type: Object
 *      properties:
 *        total:
 *          type: number
 *        componentes: array
 *        productos: array
 *        base64Comprobante: string
 *        _cliente: string
 *        fechaCreacion: Date
 *      example:
 *        total: 24.50
 *        componentes: [{"_componente":"oihdfkvjndiufvh", "cantidad":2}]
 *        productos: [{"_producto":"oihdfkvjndiufvh", "cantidad":3}]
 *        base64Comprobante: KAUHDIUHBJygaYGUHGUYGU
 *        _cliente: 638cb9c5959e03572e1e7309
 *        fechaCreacion: 2022-12-04T15:16:02.555Z
 *    PedidoUpdateState:
 *      type: Object
 *      properties:
 *        id: string
 *        estado: string
 *      example:
 *        id: KJHKHjhgGHGvhtfh
 *        estado: completado
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
 *        message: 'No hay suficiente stock!'
 *        errors: []
 *        status: 400
 */
/**
 * @swagger
 * tags:
 *  name: Pedido
 *  descripcion: Pedido enpoints
 */
/**
 * @swagger
 * /api/pedido:
 *  post:
 *    summary: Agregar pedido
 *    tags: [Pedido]
 *    description: Agregar pedido
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
 *            $ref: '#components/schemas/PedidoRequest'
 *    responses:
 *      200:
 *        description: Retorna el pedido ingresado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PedidoResponse'
 *      400:
 *        description: Devuelve un objeto de tipo Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/', pedidoController.create);
/**
 * @swagger
 * /api/pedido:
 *  get:
 *    summary: Lista de pedido
 *    tags: [Pedido]
 *    description: Devuelve una lista de pedidos
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    responses:
 *      200:
 *        description: Retorna una lista de pedidos.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PedidoResponse'
 */
router.get('/', pedidoController.getAll);
/**
 * @swagger
 * /api/pedido:
 *  patch:
 *    summary: Actualizar el estado del pedido
 *    tags: [Pedido]
 *    description: Actualiza el estado del pedido
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
 *            $ref: '#components/schemas/PedidoUpdateState'
 *    responses:
 *      200:
 *        description: Retorna el pedido actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PedidoResponse'
 */
router.patch('/', pedidoController.updateState);
exports.default = router;
