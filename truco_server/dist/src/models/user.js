"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, socketId, wins, id) {
        this.name = name;
        this.socketId = socketId;
        this.wins = wins;
        this.id = id;
    }
    isEqual(user) {
        return this.id === user.id;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map