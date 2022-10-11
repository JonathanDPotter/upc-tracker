"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// config
const config_1 = __importDefault(require("./config"));
// routes
const routes_1 = __importDefault(require("./routes"));
const group_1 = __importDefault(require("./routes/group"));
const user_1 = __importDefault(require("./routes/user"));
const server = (0, express_1.default)();
server.listen(config_1.default.SERVER.port, () => {
    console.log(`Server listening on port: ${config_1.default.SERVER.port}`);
    // connect to mongoose
    mongoose_1.default.connect(config_1.default.MONGO.url, config_1.default.MONGO.options, () => console.log(`Connected to mongodb collection ${config_1.default.MONGO.collection}`));
    // add logging with morgan
    server.use((0, morgan_1.default)("dev"));
    // parsing requests
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    // cors setup
    server.use((0, cors_1.default)({
        origin: "*",
        allowedHeaders: "*"
    }));
    // routes
    server.use("/", routes_1.default);
    server.use("/api/group", group_1.default);
    server.use("/api/user", user_1.default);
});
