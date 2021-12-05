"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const truco_1 = require("./routes/truco");
const socket_io_1 = require("socket.io");
const conn_1 = require("./db/conn");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config({ path: './config.env' });
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(truco_1.trucoRoutes);
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
        console.log("chat");
        io.emit("chat", {
            msg: data.msg
        });
    });
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
app.listen(port, () => {
    (0, conn_1.connectToServer)((err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log(`Running on port ${port}`);
});
//TODO:
// add routing file, see https://mongodb.com/languages/mern-stack-tutorial
//# sourceMappingURL=index.js.map