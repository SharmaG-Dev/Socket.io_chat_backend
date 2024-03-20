"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.failedResponse = exports.successResponse = void 0;
var successResponse = function (res, data) {
    return res.status(200).json({ error: false, message: 'success', data: data });
};
exports.successResponse = successResponse;
var failedResponse = function (res, message) {
    return res.status(400).json({ error: true, message: message });
};
exports.failedResponse = failedResponse;
var errorResponse = function (res, message) {
    return res.status(500).json({ error: true, message: message });
};
exports.errorResponse = errorResponse;
