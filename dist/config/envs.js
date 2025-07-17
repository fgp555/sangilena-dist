"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
exports.DB_ENV = {
    DB_TYPE: process.env.DB_TYPE || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: parseInt(process.env.DB_PORT || "5432", 10),
    DB_DATABASE: process.env.DB_DATABASE || "postgres",
    DB_USERNAME: process.env.DB_USERNAME || "postgres",
    DB_PASSWORD: process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD,
    SEED_DATA: process.env.SEED_DATA === "true",
    DROPSCHEMA: process.env.DROPSCHEMA === "true",
    SYNCHRONIZE: process.env.SYNCHRONIZE === "true",
    DEV_MODE: process.env.DEV_MODE === "true",
    DB_SSL: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
};
//# sourceMappingURL=envs.js.map