"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateUserName = void 0;
function GenerateUserName() {
    var items = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var name = "";
    for (var i = 0; i < 6; i++) {
        name += items.charAt(Math.floor(Math.random() * items.length));
    }
    return name;
}
exports.GenerateUserName = GenerateUserName;
