"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const config_1 = require("../config");
exports.swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST Comedor EPN',
            version: '1.0.0',
            description: 'API REST que sirve los enpoint necesarios para el funcionamiento del comedor EPN'
        },
        servers: [
            {
                url: `http://localhost:${config_1.PORT}`
            }
        ]
    },
    apis: ['./src/infraestructura/routes/*.ts'],
};
