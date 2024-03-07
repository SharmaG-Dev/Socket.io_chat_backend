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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var connections_1 = require("./helper/config/connections");
var message_func_1 = require("./helper/func/message.func");
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, { cors: {} });
(0, connections_1.connectTodb)();
var port = parseInt(process.env.PORT || "5000", 10);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var users = {};
var chats = {};
io.on("connection", function (socket) {
    console.log("new connection join", socket.id);
    socket.on("new-user", function (data) {
        users[socket.id] = data;
        socket.emit("users", users);
        socket.broadcast.emit("users", users);
    });
    socket.on("message", function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sender, reciver, messagesData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = JSON.parse(data), sender = _a.sender, reciver = _a.reciver;
                    return [4 /*yield*/, (0, message_func_1.GetUserMessage)({ reciverid: reciver, senderid: sender })];
                case 1:
                    messagesData = _b.sent();
                    socket.emit("message:".concat(sender, "-").concat(reciver), messagesData);
                    socket.broadcast.emit("message:".concat(sender, "-").concat(reciver), messagesData);
                    socket.broadcast.emit("message:".concat(reciver, "-").concat(sender), messagesData);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('send-message', function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, reciver, sender, message, messagesData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = JSON.parse(data), reciver = _a.reciver, sender = _a.sender, message = _a.message;
                    return [4 /*yield*/, (0, message_func_1.RegisterMessage)({ message: message, sender: sender, reciver: reciver })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, (0, message_func_1.GetUserMessage)({ reciverid: reciver, senderid: sender })];
                case 2:
                    messagesData = _b.sent();
                    socket.emit("message:".concat(sender, "-").concat(reciver), messagesData);
                    socket.broadcast.emit("message:".concat(sender, "-").concat(reciver), messagesData);
                    socket.broadcast.emit("message:".concat(reciver, "-").concat(sender), messagesData);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('disconnect', function () {
        delete users[socket.id];
        socket.emit("users", users);
        socket.broadcast.emit("users", users);
    });
});
app.get("/", function (req, res) {
    res.send("Welcome to the chatting server");
});
server.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
// io.on('connection', async (socket) => {
//     socket.on("new-user", (data) => {
//         if (!users.has(data)) {
//             users.add(data);
//             idBasedUser = { ...idBasedUser, [socket.id]: data }
//         }
//         socket.emit("users", Array.from(users));
//     });
//     socket.on("user-logout", (data) => {
//         if (users.has(data)) {
//             users.delete(data);
//             socket.emit("users", Array.from(users));
//         }
//     });
//     socket.on('disconnect', async () => {
//         console.log(users)
//         const data = idBasedUser[socket.id]
//         if (users.has(data)) {
//             users.delete(data)
//         }
//         socket.emit("users", Array.from(users))
//     });
// });
