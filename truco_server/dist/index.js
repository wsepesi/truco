"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config({ path: './config.env' });
// require('dotenv').config({ path: './config.env'})
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(require("./routes/record")); ADD BACK LATER
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
});
httpServer.listen(4000);
// const dbo = require('./db/conn');
app.get('/', (_, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    // connectToServer((err: any) => { //TODO: type
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    console.log(`Running on port ${port}`);
});
//TODO:
// add routing file, see https://mongodb.com/languages/mern-stack-tutorial
//# sourceMappingURL=index.js.map