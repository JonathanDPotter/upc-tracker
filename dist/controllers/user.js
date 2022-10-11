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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
// utils
const signJWT_1 = __importDefault(require("../middleware/signJWT"));
const validateToken = (req, res) => {
    return res.status(200).json({ message: "Token validated, user authorized." });
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username });
        if (user) {
            const isAuth = yield bcrypt_1.default.compare(password, user.password);
            if (isAuth) {
                (0, signJWT_1.default)(user, (error, token) => {
                    if (error)
                        res.json({ message: "Unauthorized" });
                    if (token)
                        res.status(200).json({ token });
                });
            }
            else {
                res.json({ message: "Unauthorized" });
            }
        }
        else {
            res.json({ message: "User not found." });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password, key } = req.body;
    try {
        const exists = yield user_1.default.findOne({ username }).exec();
        if (exists) {
            return res.json({ message: "Username already in use." });
        }
        else {
            const hash = yield bcrypt_1.default.hash(password, 10);
            const newUser = new user_1.default({
                username,
                password: hash,
            });
            const { _id } = yield newUser.save();
            res.status(201).json({ _id, username });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        res.json(error);
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params._id);
        res.status(200).json(user_1.default);
    }
    catch (error) {
        res.json(error);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.findByIdAndUpdate(req.params, req.body, {
            new: true,
        });
        if (result) {
            const { _id } = result;
            res.status(200).json({ _id, message: "updated" });
        }
    }
    catch (error) {
        res.json(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield user_1.default.findByIdAndDelete(req.params._id);
        if (deleted) {
            const { username } = deleted;
            res.status(200).json({ username, message: "deleted" });
        }
    }
    catch (error) {
        res.json(error);
    }
});
const controller = {
    validateToken,
    register,
    login,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
exports.default = controller;
