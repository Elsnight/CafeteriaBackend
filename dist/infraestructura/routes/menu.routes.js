"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencias_1 = require("../dependencias");
const router = (0, express_1.Router)();
const menuController = dependencias_1.contenedor.resolve('menuController');
/**
 * @swagger
 * tags:
 *  name: Menu
 *  descripcion: Menu enpoints
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    MenuResponse:
 *      type: Object
 *      properties:
 *        id:
 *          type: string
 *        titulo:
 *          type: string
 *        fecha:
 *          type: Date
 *        componentes:
 *          type: Object[]
 *        fechaCreacion: Date
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        titulo: Menu navideño
 *        fecha: 2022-13-04T00:00:00.000Z
 *        componentes: []
 *        fechaCreacion: 2022-12-04T15:16:02.555Z
 *    MenuRequestPatch:
 *      type: Object
 *      properties:
 *        id:
 *          type: string
 *        _componente:
 *          type: string
 *      example:
 *        id: 638cb9c5959e03572e1e7309
 *        _componente: 638cb9c5959e03572e1e7307
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
 *    MenuRequest:
 *      type: Object
 *      properties:
 *        titulo:
 *          type: string
 *        fecha:
 *          type: Date
 *        componentes:
 *          type: Object[]
 *        fechaCreacion: Date
 *      example:
 *        titulo: Menu navideño
 *        fecha: 2022-13-04T00:00:00.000Z
 *        componentes: [oiehrjvoijirre, lrfnerofnou]
*/
/**
 * @swagger
 * /api/menu:
 *  get:
 *    summary: Lista de Menus
 *    tags: [Menu]
 *    description: Devuelve una lista de menus
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Este debe ser el mismo token que se envío cuando se inicio sesión
 *    responses:
 *      200:
 *        description: Retorna una lista de menus.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/MenuResponse'
 *      400:
 *        description: Retorna el error.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.get('/', menuController.getAll);
/**
 * @swagger
 * /api/menu:
 *  post:
 *    summary: Crear un menu
 *    tags: [Menu]
 *    description: Crear un menu
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
 *            $ref: '#components/schemas/MenuRequest'
 *    responses:
 *      200:
 *        description: Retorna el menu ingresado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MenuResponse'
 *      400:
 *        description: Retorna el error.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/', menuController.create);
/**
 * @swagger
 * /api/menu/{id}:
 *  delete:
 *    summary: Eliminar menu
 *    tags: [Menu]
 *    description: Eliminar menu por el id
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
 *        description: Retorna el menu eliminado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MenuResponse'
 *      400:
 *        description: Devuelve un objeto de tipo Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.delete('/:id', menuController.delete);
/**
 * @swagger
 * /api/menu:
 *  patch:
 *    summary: Actualizar el estado de un componente del menu
 *    tags: [Menu]
 *    description: Actualizar el estado de un componente del menu
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
 *            $ref: '#components/schemas/MenuRequestPatch'
 *    responses:
 *      200:
 *        description: Retorna el menu actualizado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MenuResponse'
 *      400:
 *        description: Retorna el error.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.patch('/', menuController.updateState);
exports.default = router;
