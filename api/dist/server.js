"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./routes/user");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_2 = require("./models/user");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});
sequelize.addModels([user_2.User]);
sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
});
app.use((0, express_1.urlencoded)({
    extended: true,
}));
(0, user_1.RegisterRoutes)(app);
app.use("/docs", swagger_ui_express_1.default.serve, async (_req, res) => {
    try {
        const swaggerDocument = await Promise.resolve(`${path_1.default.resolve(__dirname, '../dist/swagger.json')}`).then(s => __importStar(require(s)));
        res.send(swagger_ui_express_1.default.generateHTML(swaggerDocument.default));
    }
    catch (error) {
        res.status(500).send("Failed to load swagger document: " + error.message);
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
