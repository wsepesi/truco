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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_TOKEN = exports.forfeit = void 0;
const routesUtils_1 = require("./routes/routesUtils");
const forfeit = (gameId, io, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield (0, routesUtils_1.getGame)(gameId);
    const playerId = socket.id;
    game.forfeit(playerId);
    yield (0, routesUtils_1.updateGame)(game);
    io.in(game.gameId).emit("updateAll", game);
    const player = game.hostId === socket.id ? "host" : "other";
    io.in(game.gameId).emit("chat", {
        msg: `${player} forfeited the game`,
        id: exports.SERVER_TOKEN
    });
});
exports.forfeit = forfeit;
exports.SERVER_TOKEN = "SERVER_TOKEN";
//# sourceMappingURL=utils.js.map