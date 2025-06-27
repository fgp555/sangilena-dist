"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
// src/app.ts
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const feedback_routes_1 = __importDefault(require("./module/feedback/feedback.routes"));
const email_routes_1 = __importDefault(require("./module/mail/email.routes"));
const setupFrontendFallback_1 = require("./utils/setupFrontendFallback");
const createApp = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.json());
    // Routes
    app.use("/api/feedback", feedback_routes_1.default);
    // app.use("/api/google-sheet", googleSheetRoutes);
    app.use("/api/email", email_routes_1.default);
    // app.use("/api/category", categoryRoutes);
    // app.use("/api/menu", menuRoutes);
    // app.use("/api/restaurant", restaurantRoutes);
    // app.use("/api/sheet", sheetRoutes);
    const clientBuildPath = path_1.default.join(__dirname, "../../sangilena-dist/frontend");
    (0, setupFrontendFallback_1.setupFrontendFallback)(app, clientBuildPath);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map