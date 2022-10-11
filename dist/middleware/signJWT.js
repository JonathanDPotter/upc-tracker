"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signJWT = (user, callback) => {
    const { username, password } = user;
    console.log(`Attempting to sign token for ${username}`);
    try {
        jsonwebtoken_1.default.sign({ username }, config_1.default.SERVER.token.secret, {
            issuer: config_1.default.SERVER.token.issuer,
            algorithm: "HS256",
            expiresIn: "1d",
        }, (error, token) => {
            if (error) {
                {
                    callback(error, null);
                }
            }
            else if (token) {
                {
                    callback(null, token);
                }
            }
        });
    }
    catch (error) {
        console.error(error.message, error);
        callback(error, null);
    }
};
exports.default = signJWT;
