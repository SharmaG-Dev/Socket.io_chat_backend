"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("./user"));
var auth_1 = __importDefault(require("./auth"));
var router = express_1.default.Router();
router.use("/auth", auth_1.default);
router.use("/user", user_1.default);
exports.default = router;
