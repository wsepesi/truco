import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./src/types";
import { getGame, getRoom, getRooms, updateGame, updateRoom } from "./src/routes/routesUtils";

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
  socket.on('startGame', async (id) => {
    // GET GAME FROM DB
    const game: Game = await getGame(id);

    // START HAND ON OBJECT
    game.startHand();

    // SEND GAME TO DB
    await updateGame(game);

    // UPDATE CLIENTS IN ROOM
    io.in(game.gameId).emit("startGame", game);
  });

  socket.on('playCard', async (data) => {
    const { gameId, playerId, cardId } = data;
    // GET GAME FROM DB
    const game: Game = await getGame(gameId);
    console.log(game);
    game.playCard(cardId, playerId);

    // UPDATE GAME IN DB
    await updateGame(game);

    // UPDATE CLIENTS IN ROOM
    io.in(game.gameId).emit("updateAll", game);
  });

  socket.on('trucoCalled', async (data) => {
      const game: Game = await getGame(data.gameId);
      game.handleTrucoCalledBy(data.userId);
      await updateGame(game);
      io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('envidoCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoCalledBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('trucoQuieroCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleTrucoQuieroBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('trucoNoQuieroCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleTrucoNoQuieroBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('retrucoCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleRetrucoBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('quieroConCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoQuieroConBy(data.userId, data.number);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('envidoNoQuieroCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoNoQuieroBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('quieroConFlorCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoQuieroConFlorBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('esMejorCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEsMejorBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('tengoCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleTengoBy(data.userId, data.number);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('tengoFlorTambienCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleFlorTambienBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
  })

  socket.on('ready', async (data) => {
    const room: Room = await getRoom(data);
    room.readyCount++;
    if(room.readyCount === 2) {
      // START NEXT HAND
      const game: Game = await getGame(data);
      game.startHand();
      await updateGame(game);
      io.in(game.gameId).emit("updateAll", game);
      room.readyCount = 0;
    }
    await updateRoom(data, room);

  })
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
