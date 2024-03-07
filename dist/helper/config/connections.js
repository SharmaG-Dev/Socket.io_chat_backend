"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectTodb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MongoUrl = (process.env.MONGOURL);
var connectTodb = function () { return mongoose_1.default.connect(MongoUrl).then(function () {
    console.log("server connected to database");
}).catch(function (error) {
    console.log(error);
}); };
exports.connectTodb = connectTodb;
