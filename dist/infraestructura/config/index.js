"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.MONGO_URI = exports.SECRET = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== "production") {
    (0, dotenv_1.config)();
}
exports.PORT = process.env.PORT;
exports.SECRET = process.env.SECRET;
exports.MONGO_URI = process.env.MONGO_URI;
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
