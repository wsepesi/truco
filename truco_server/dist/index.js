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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./src/types");
const utils_1 = require("./src/utils");
const database_service_1 = require("./src/services/database.service");
const routesUtils_1 = require("./src/routes/routesUtils");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const truco_router_1 = require("./src/routes/truco.router");
dotenv_1.default.config({ path: './config.env' });
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});
io.on("connection", (socket) => {
    socket.on("chat", (data) => {
        io.in(data.room).emit("chat", {
            msg: data.msg,
            id: socket.id
        });
    });
    // UPDATE ROOMS LIST
    socket.on("updateRooms", () => __awaiter(void 0, void 0, void 0, function* () {
        // GET ROOMS FROM DB
        const rooms = yield (0, routesUtils_1.getRooms)();
        // SEND ROOMS TO CLIENT
        io.emit("rooms", rooms);
    }));
    // JOIN ROOM
    socket.on('joinRoom', (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("join room", roomId);
        socket.join(roomId);
        // GET ROOM FROM DB
        const room = yield (0, routesUtils_1.getRoom)(roomId);
        const player = yield (0, routesUtils_1.getUser)(socket.id);
        if (room.users.length >= 2) {
            socket.emit("readyToStart", roomId);
        }
        const isHost = room.host.socketId === socket.id;
        if (isHost)
            return; // we dont want the host doing the below things moved over from PUT
        if (!room || !player)
            throw new Error("Room or player not found");
        room.other = player;
        room.users.push(player);
        yield (0, routesUtils_1.updateRoom)(roomId, room);
        (0, routesUtils_1.createGame)(roomId, room.host.socketId, room.other.socketId);
        socket.emit('readyToStart', roomId);
    }));
    // START GAME
    socket.on('startGame', (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("start game", id);
        // GET GAME FROM DB
        const game = yield (0, routesUtils_1.getGame)(id);
        if (socket.id !== game.hostId && socket.id !== game.otherId) {
            socket.emit("updateAll", game);
            return;
        }
        // START HAND ON OBJECT
        game.startHand();
        // SEND GAME TO DB
        yield (0, routesUtils_1.updateGame)(game);
        // UPDATE CLIENTS IN ROOM
        io.in(game.gameId).emit("startGame", game);
        io.in(game.gameId).emit("chat", {
            msg: "Game is starting...",
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('playCard', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { gameId, playerId, cardId } = data;
        // GET GAME FROM DB
        const game = yield (0, routesUtils_1.getGame)(gameId);
        // console.log(game);
        game.playCard(cardId, playerId);
        const player = game.hostId === playerId ? "Host" : "Guest";
        const card = types_1.CardIds[cardId];
        // UPDATE GAME IN DB
        yield (0, routesUtils_1.updateGame)(game);
        const numRe = /\d+/;
        const num = card.match(numRe);
        const suitRe = /\D+/;
        const suit = card.match(suitRe);
        // UPDATE CLIENTS IN ROOM
        io.in(game.gameId).emit("updateAll", game);
        io.in(game.gameId).emit("chat", {
            msg: `${player} played ${num} of ${suit}`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('trucoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTrucoCalledBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called truco`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('envidoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoCalledBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called envido`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('trucoQuieroCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTrucoQuieroBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called quiero`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('trucoNoQuieroCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTrucoNoQuieroBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called no quiero`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('retrucoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleRetrucoBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called retruco`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('quieroConCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoQuieroConBy(data.userId, data.number);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called quiero con ${data.number}`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('envidoNoQuieroCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoNoQuieroBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called no quiero`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('quieroConFlorCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoQuieroConFlorBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called flor`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('esMejorCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEsMejorBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called es mejor`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('tengoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTengoBy(data.userId, data.number);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called tengo with ${data.number}`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('tengoFlorCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTengoFlorBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called flor`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('tengoFlorTambienCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleFlorTambienBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
        const player = game.hostId === data.userId ? "Host" : "Guest";
        io.in(game.gameId).emit("chat", {
            msg: `${player} called flor`,
            id: utils_1.SERVER_TOKEN
        });
    }));
    socket.on('ready', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const room = yield (0, routesUtils_1.getRoom)(data);
        console.log(room);
        room.readyCount++;
        const game = yield (0, routesUtils_1.getGame)(data);
        if (room.readyCount === 2) {
            console.log("READY");
            // START NEXT HAND
            game.startHand();
            yield (0, routesUtils_1.updateGame)(game);
            io.in(game.gameId).emit("updateAll", game);
            room.readyCount = 0;
        }
        else {
            const player = game.hostId === socket.id ? "Host" : "Guest";
            io.in(game.gameId).emit("chat", {
                msg: `${player} is ready`,
                id: utils_1.SERVER_TOKEN
            });
        }
        yield (0, routesUtils_1.updateRoom)(data, room);
    }));
    socket.on('overReady', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const room = yield (0, routesUtils_1.getRoom)(data);
        room.readyCount++;
        console.log(room.id);
        if (room.readyCount === 2) {
            console.log("READY");
            // DELETE OLD GAME
            yield (0, routesUtils_1.deleteGame)(data);
            (0, routesUtils_1.createGame)(data, room.host.socketId, room.other.socketId);
            const game = yield (0, routesUtils_1.getGame)(data);
            // console.log(game.gameId);
            game.startHand();
            yield (0, routesUtils_1.updateGame)(game);
            io.in(game.gameId).emit("startGame", game);
            room.readyCount = 0;
        }
        yield (0, routesUtils_1.updateRoom)(data, room);
    }));
    socket.on('forfeit', (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, utils_1.forfeit)(data, io, socket);
    }));
    socket.on('leave', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, started } = data;
        if (started)
            yield (0, utils_1.forfeit)(id, io, socket);
        const playerId = socket.id;
        // REMOVE PLAYER FROM ROOM
        const room = yield (0, routesUtils_1.getRoom)(id);
        room.users = room.users.filter(p => p.socketId !== playerId);
        socket.leave(playerId);
        io.in(id).emit("chat", {
            msg: `Opponent left the game`,
            id: utils_1.SERVER_TOKEN
        });
        // REMOVE ROOM IF EMPTY
        if (room.users.length === 0) {
            yield (0, routesUtils_1.deleteRoom)(id);
        }
        else {
            if (room.host.socketId === playerId) {
                room.host = room.other;
                room.other = null;
                io.in(id).emit("chat", {
                    msg: `You are the new host!`,
                    id: utils_1.SERVER_TOKEN
                });
            }
            else {
                room.other = null;
            }
            yield (0, routesUtils_1.updateRoom)(id, room);
        }
        // UPDATE ALL PLAYERS IN HOME
        io.emit("rooms", yield (0, routesUtils_1.getRooms)());
    }));
});
httpServer.listen(4000);
app.get('/', (_, res) => {
    res.send('Hello World!');
});
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/db", truco_router_1.trucoRouter);
    app.listen(port, () => {
        console.log(`Running on port ${port}`);
    });
})
    .catch((error) => {
    console.log(error);
    process.exit();
});
//# sourceMappingURL=index.js.map