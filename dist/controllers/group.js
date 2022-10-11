"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const group_1 = __importDefault(require("../models/group"));
const makeGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGroup = new group_1.default(req.body);
        const result = yield newGroup.save();
        res.status(201).json(result);
    }
    catch (error) {
        res.json(error);
    }
});
const getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield group_1.default.find();
        res.status(200).json(groups);
    }
    catch (error) {
        res.json(error);
    }
});
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield group_1.default.findById(req.params._id);
        res.status(200).json(group);
    }
    catch (error) {
        res.json(error);
    }
});
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield group_1.default.findByIdAndUpdate(req.params, req.body, {
            new: true,
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.json(error);
    }
});
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield group_1.default.findByIdAndDelete(req.params._id);
        res.status(200).json(deleted);
    }
    catch (error) {
        res.json(error);
    }
});
const controller = { makeGroup, getGroups, getGroup, updateGroup, deleteGroup };
exports.default = controller;
