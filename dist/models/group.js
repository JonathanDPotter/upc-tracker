"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    upcs: { type: [Number], required: true },
});
exports.default = (0, mongoose_1.model)("Group", GroupSchema);
