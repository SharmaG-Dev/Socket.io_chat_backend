"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_validate_1 = require("../validator/user.validate");
var user_controllers_1 = require("../controllers/user.controllers");
var router = express_1.default.Router();
router.route("/create").post(user_validate_1.CreateUserValidate, user_controllers_1.RegisterUser);
router.route("/log-in").post(user_validate_1.LoginUserValidate, user_controllers_1.loginUser);
exports.default = router;
