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
    socket.on('startHand', (id) => __awaiter(void 0, void 0, void 0, function* () {
        // GET GAME FROM DB
        const game = yield (0, routesUtils_1.getGame)(id);
        // START HAND ON OBJECT
        game.startHand();
        // SEND GAME TO DB
        yield (0, routesUtils_1.updateGame)(game);
        // UPDATE CLIENTS IN ROOM
        io.in(game.gameId).emit("startHand", game);
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