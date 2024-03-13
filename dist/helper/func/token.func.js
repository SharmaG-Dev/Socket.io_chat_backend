"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secretKey = process.env.SECRET_AUTH;
if (!secretKey) {
    throw new Error("Secret key is not defined in the environment variables.");
}
var CreateToken = function (user) {
    var _id = user._id, username = user.username, name = user.name, email = user.email;
    var payload = { _id: _id, username: username, name: name, email: email };
    var response = jsonwebtoken_1.default.sign(payload, secretKey);
    return response;
};
exports.CreateToken = CreateToken;
