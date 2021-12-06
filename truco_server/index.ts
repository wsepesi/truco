import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./src/types";
import { getGame, getRooms, updateGame } from "./src/routes/routesUtils";

import Game from "./src/gameLogic";
import Room from "./src/models/room";
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
    console.log("chat", data.room);
    io.in(data.room).emit("chat", {
      msg: data.msg
    });
  })

  // UPDATE ROOMS LIST
  socket.on("updateRooms", async () => {
    // GET ROOMS FROM DB
    const rooms: Room[] = await getRooms();

    console.log("got rooms", rooms);

    // SEND ROOMS TO CLIENT
    io.emit("rooms", rooms);
  });

  // JOIN ROOM
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  })

  // START GAME
  socket.on('startHand', async (id) => {
    // GET GAME FROM DB
    const game: Game = await getGame(id);

    // START HAND ON OBJECT
    game.startHand();

    // SEND GAME TO DB
    await updateGame(game);

    // UPDATE CLIENTS IN ROOM
    io.in(game.gameId).emit("startHand", game);
  });
})

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
  app.use("/db", trucoRouter);

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
