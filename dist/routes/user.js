"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = (0, express_1.Router)();
router.get("/validate", extractJWT_1.default, user_1.default.validateToken);
router.post("/register", user_1.default.register);
router.post("/login", user_1.default.login);
router.get("/", user_1.default.getUsers);
router.get("/:_id", user_1.default.getUser);
router.put("/:_id", extractJWT_1.default, user_1.default.updateUser);
router.delete("/:_id", extractJWT_1.default, user_1.default.deleteUser);
exports.default = router;
