"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var connections_1 = require("./helper/config/connections");
var websockets_1 = __importDefault(require("./helper/services/websockets"));
var app_1 = __importDefault(require("./helper/routes/app"));
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, { cors: {} });
(0, connections_1.connectTodb)();
var port = parseInt(process.env.PORT || "5000", 10);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// send to socket server
new websockets_1.default(io);
app.use("/api", app_1.default);
app.get("/", function (req, res) {
    res.send("Welcome to the chatting server");
});
server.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
