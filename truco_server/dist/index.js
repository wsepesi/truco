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
const routesUtils_1 = require("./src/routes/routesUtils");
const socket_io_1 = require("socket.io");
const database_service_1 = require("./src/services/database.service");
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
const t = "hi";
console.log(t);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});
io.on("connection", (socket) => {
    socket.on("hello", () => {
        console.log("Test");
        socket.emit('ping', 'pong');
    });
    socket.on("chat", (data) => {
        console.log("chat", data.room);
        io.in(data.room).emit("chat", {
            msg: data.msg
        });
    });
    // UPDATE ROOMS LIST
    socket.on("updateRooms", () => __awaiter(void 0, void 0, void 0, function* () {
        // GET ROOMS FROM DB
        const rooms = yield (0, routesUtils_1.getRooms)();
        console.log("got rooms", rooms);
        // SEND ROOMS TO CLIENT
        io.emit("rooms", rooms);
    }));
    // JOIN ROOM
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
    });
    // START GAME
    socket.on('startGame', (id) => __awaiter(void 0, void 0, void 0, function* () {
        // GET GAME FROM DB
        const game = yield (0, routesUtils_1.getGame)(id);
        // START HAND ON OBJECT
        game.startHand();
        // SEND GAME TO DB
        yield (0, routesUtils_1.updateGame)(game);
        // UPDATE CLIENTS IN ROOM
        io.in(game.gameId).emit("startGame", game);
    }));
    socket.on('playCard', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { gameId, playerId, cardId } = data;
        // GET GAME FROM DB
        const game = yield (0, routesUtils_1.getGame)(gameId);
        console.log(game);
        game.playCard(cardId, playerId);
        // UPDATE GAME IN DB
        yield (0, routesUtils_1.updateGame)(game);
        // UPDATE CLIENTS IN ROOM
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('trucoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTrucoCalledBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('envidoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoCalledBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('trucoQuieroCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTrucoQuieroBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('trucoNoQuieroCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTrucoNoQuieroBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('retrucoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleRetrucoBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('quieroConCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoQuieroConBy(data.userId, data.number);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('envidoNoQuieroCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoNoQuieroBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('quieroConFlorCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEnvidoQuieroConFlorBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('esMejorCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleEsMejorBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('tengoCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleTengoBy(data.userId, data.number);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('tengoFlorTambienCalled', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const game = yield (0, routesUtils_1.getGame)(data.gameId);
        game.handleFlorTambienBy(data.userId);
        yield (0, routesUtils_1.updateGame)(game);
        io.in(game.gameId).emit("updateAll", game);
    }));
    socket.on('ready', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const room = yield (0, routesUtils_1.getRoom)(data);
        room.readyCount++;
        if (room.readyCount === 2) {
            // START NEXT HAND
            const game = yield (0, routesUtils_1.getGame)(data);
            game.startHand();
            yield (0, routesUtils_1.updateGame)(game);
            io.in(game.gameId).emit("updateAll", game);
            room.readyCount = 0;
        }
        yield (0, routesUtils_1.updateRoom)(data, room);
    }));
});
httpServer.listen(4000);
app.get('/', (_, res) => {
    res.send('Hello World!');
});
// app.get('login', (req, res) => {
//   const { username, socketId } = req.body;
//   const user: User = {
//     id: null,
//     username,
//     socketId
//   }
//   truco
//   // add to database  
//   res.send({ success: true});
// });
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
//TODO:
// add routing file, see https://mongodb.com/languages/mern-stack-tutorial
//# sourceMappingURL=index.js.map