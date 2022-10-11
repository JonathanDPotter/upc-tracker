"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const group_1 = __importDefault(require("../controllers/group"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = (0, express_1.Router)();
router.post("/", extractJWT_1.default, group_1.default.makeGroup);
router.get("/", group_1.default.getGroups);
router.get("/:_id", group_1.default.getGroup);
router.put("/:_id", extractJWT_1.default, group_1.default.updateGroup);
router.delete("/:_id", extractJWT_1.default, group_1.default.deleteGroup);
exports.default = router;
