"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(name, host) {
        this.users = [];
        this.name = name;
        this.host = host;
        this.users.push(host);
    }
    joinRoom(user) {
        if (this.users.length === 1) {
            this.other = user;
        }
        this.users.push(user);
    }
    leaveRoom(user) {
        this.users.splice(this.users.indexOf(user), 1);
        if (user.isEqual(this.other)) {
            this.other = undefined;
        }
        if (user.isEqual(this.host)) {
            this.host = undefined;
        }
    }
}
exports.default = Room;
//# sourceMappingURL=room.js.map