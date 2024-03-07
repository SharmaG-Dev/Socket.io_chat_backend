"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    sender: {
        type: String,
        required: true
    },
    reciver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.MessageModel = (0, mongoose_1.model)("messages", schema);
