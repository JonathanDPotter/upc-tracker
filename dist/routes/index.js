"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welcome_json_1 = __importDefault(require("../welcome.json"));
const router = (0, express_1.Router)();
router.get("", (req, res) => res.json(welcome_json_1.default));
exports.default = router;
