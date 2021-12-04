import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./src/types";

import { Server } from "socket.io";
import connectToServer from "./db/conn";
import cors from 'cors'
import { createServer } from "http";
import dotenv from 'dotenv'
import express from 'express'

dotenv.config({ path: './config.env'});

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// app.use(require("./routes/record")); ADD BACK LATER

const t = "hi";
console.log(t);

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST']
  }
});

io.on("connection", (socket) => {
  socket.on("hello", () => {
    console.log("Test");
    socket.emit('ping', 'pong');
  })

  socket.on("chat", (data) => {
    console.log("chat");
    io.emit("chat", {
      msg: data.msg
    });
  })
});

httpServer.listen(4000);

// const dbo = require('./db/conn');

app.get('/', (_, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  // connectToServer((err: any) => { //TODO: type
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  console.log(`Running on port ${port}`)
})

//TODO:
// add routing file, see https://mongodb.com/languages/mern-stack-tutorial
