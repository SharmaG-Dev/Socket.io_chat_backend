"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
var schema = new mongoose_2.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    groups: {
        type: [],
    },
    friends: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    friendRequests: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "friend_requests",
        },
    ],
    sendRequests: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "friend_requests",
        },
    ],
    activeHistory: [],
}, {
    timestamps: true,
});
var UserModel = (0, mongoose_2.model)("users", schema);
exports.default = UserModel;
