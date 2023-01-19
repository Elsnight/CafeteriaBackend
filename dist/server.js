"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const config_1 = require("./infraestructura/config");
const mongo_1 = require("./infraestructura/db/mongo");
const swaggerOptions_1 = require("./infraestructura/docs/swaggerOptions");
const usuario_routes_1 = __importDefault(require("./infraestructura/routes/usuario.routes"));
const producto_routes_1 = __importDefault(require("./infraestructura/routes/producto.routes"));
const componente_routes_1 = __importDefault(require("./infraestructura/routes/componente.routes"));
const menu_routes_1 = __importDefault(require("./infraestructura/routes/menu.routes"));
const pedido_routes_1 = __importDefault(require("./infraestructura/routes/pedido.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        (0, mongo_1.conectar)();
        this.configuration();
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                name: 'REST API - RESTAURANTE'
            });
        });
        this.app.use('/api/usuario', usuario_routes_1.default);
        this.app.use('/api/producto', producto_routes_1.default);
        this.app.use('/api/componente', componente_routes_1.default);
        this.app.use('/api/menu', menu_routes_1.default);
        this.app.use('/api/pedido', pedido_routes_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json({ limit: '50mb' }));
    }
    configuration() {
        this.app.set('port', config_1.PORT || 3000);
        const spec = (0, swagger_jsdoc_1.default)(swaggerOptions_1.swaggerOptions);
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
    }
    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server -> http://localhost:${this.app.get('port')}`);
        });
    }
}
exports.Server = Server;
