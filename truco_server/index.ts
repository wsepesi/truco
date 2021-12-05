import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./src/types";

import { Server } from "socket.io";
import { connectToDatabase } from "./src/services/database.service"
import cors from 'cors'
import { createServer } from "http";
import dotenv from 'dotenv'
import express from 'express'
import { trucoRouter } from './src/routes/truco.router'

dotenv.config({ path: './config.env'});

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

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

app.get('/', (_, res) => {
  res.send('Hello World!');
})

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

connectToDatabase()
.then(() => {
  app.use("/truco", trucoRouter);

  app.listen(port, () => {
    console.log(`Running on port ${port}`)
  })
})
.catch((error: Error) => {
  console.log(error);
  process.exit();
})

//TODO:
// add routing file, see https://mongodb.com/languages/mern-stack-tutorial
