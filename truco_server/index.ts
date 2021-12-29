import { CardIds, ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./src/types";
import { SERVER_TOKEN, forfeit } from "./src/utils";
import { collections, connectToDatabase } from "./src/services/database.service"
import { createGame, deleteGame, deleteRoom, getGame, getRoom, getRooms, getUser, updateGame, updateRoom } from "./src/routes/routesUtils";

import Game from "./src/gameLogic";
import Room from "./src/models/room";
import { Server } from "socket.io";
import cors from 'cors'
import { createServer } from "https";
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import { trucoRouter } from './src/routes/truco.router'

dotenv.config({ path: './config.env'});

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const options = {
    cert: fs.readFileSync(process.env.CERT_PATH),
    key: fs.readFileSync(process.env.KEY_PATH)
}

const httpsServer = createServer(options, app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpsServer, {
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
  })

  // UPDATE ROOMS LIST
  socket.on("updateRooms", async () => {
    // GET ROOMS FROM DB
    const rooms: Room[] = await getRooms();

    // SEND ROOMS TO CLIENT
    io.emit("rooms", rooms);
  });

  // JOIN ROOM
  socket.on('joinRoom', async (roomId) => {
    console.log("join room", roomId);
    socket.join(roomId);

    // GET ROOM FROM DB
    const room = await getRoom(roomId);
    const player = await getUser(socket.id);

    if(room.users.length >= 2) {
      socket.emit("readyToStart", roomId);
    }

    const isHost = room.host.socketId === socket.id;
    if (isHost) return; // we dont want the host doing the below things moved over from PUT
    if (!room || !player) throw new Error("Room or player not found");

    room.other = player;
    room.users.push(player);

    await updateRoom(roomId, room);
    createGame(roomId, room.host.socketId, room.other.socketId);

    socket.emit('readyToStart', roomId);
  })

  // START GAME
  socket.on('startGame', async (id) => {
    console.log("start game", id);
    // GET GAME FROM DB
    const game: Game = await getGame(id);

    if(socket.id !== game.hostId && socket.id !== game.otherId) {
      socket.emit("updateAll", game);
      return;
    }

    // START HAND ON OBJECT
    game.startHand();

    // SEND GAME TO DB
    await updateGame(game);

    // UPDATE CLIENTS IN ROOM
    io.in(game.gameId).emit("startGame", game);
    io.in(game.gameId).emit("chat", {
      msg: "Game is starting...",
      id: SERVER_TOKEN
    });
  });

  socket.on('playCard', async (data) => {
    const { gameId, playerId, cardId } = data;
    // GET GAME FROM DB
    const game: Game = await getGame(gameId);
    // console.log(game);
    game.playCard(cardId, playerId);

    const player = game.hostId === playerId ? "Host" : "Guest";
    const card = CardIds[cardId];

    // UPDATE GAME IN DB
    await updateGame(game);

    const numRe = /\d+/
    const num = card.match(numRe);
    const suitRe = /\D+/
    const suit = card.match(suitRe);

    // UPDATE CLIENTS IN ROOM
    io.in(game.gameId).emit("updateAll", game);
    io.in(game.gameId).emit("chat", {
      msg: `${player} played ${num} of ${suit}`,
      id: SERVER_TOKEN
    });
  });

  socket.on('trucoCalled', async (data) => {
      const game: Game = await getGame(data.gameId);
      game.handleTrucoCalledBy(data.userId);
      await updateGame(game);
      io.in(game.gameId).emit("updateAll", game);
      const player = game.hostId === data.userId ? "Host" : "Guest";
      io.in(game.gameId).emit("chat", {
        msg: `${player} called truco`,
        id: SERVER_TOKEN
      });
  })

  socket.on('envidoCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoCalledBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called envido`,
      id: SERVER_TOKEN
    });
  })

  socket.on('trucoQuieroCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleTrucoQuieroBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called quiero`,
      id: SERVER_TOKEN
    });
  })

  socket.on('trucoNoQuieroCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleTrucoNoQuieroBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);
    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called no quiero`,
      id: SERVER_TOKEN
    });
  })

  socket.on('retrucoCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleRetrucoBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called retruco`,
      id: SERVER_TOKEN
    });
  })

  socket.on('quieroConCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoQuieroConBy(data.userId, data.number);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called quiero con ${data.number}`,
      id: SERVER_TOKEN
    });
  })

  socket.on('envidoNoQuieroCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoNoQuieroBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called no quiero`,
      id: SERVER_TOKEN
    });
  })

  socket.on('quieroConFlorCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEnvidoQuieroConFlorBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called flor`,
      id: SERVER_TOKEN
    });
  })

  socket.on('esMejorCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleEsMejorBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called es mejor`,
      id: SERVER_TOKEN
    });
  })

  socket.on('tengoCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleTengoBy(data.userId, data.number);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called tengo with ${data.number}`,
      id: SERVER_TOKEN
    });
  })

  socket.on('tengoFlorCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleTengoFlorBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called flor`,
      id: SERVER_TOKEN
    });
  })

  socket.on('tengoFlorTambienCalled', async (data) => {
    const game: Game = await getGame(data.gameId);
    game.handleFlorTambienBy(data.userId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === data.userId ? "Host" : "Guest";
    io.in(game.gameId).emit("chat", {
      msg: `${player} called flor`,
      id: SERVER_TOKEN
    });
  })

  socket.on('ready', async (data) => {
    const room: Room = await getRoom(data);
    console.log(room);
    room.readyCount++;
    const game: Game = await getGame(data);
    if(room.readyCount === 2) {
      console.log("READY")
      // START NEXT HAND
      game.startHand();
      await updateGame(game);
      io.in(game.gameId).emit("updateAll", game);
      room.readyCount = 0;
    } else {
      const player = game.hostId === socket.id ? "Host" : "Guest";
      io.in(game.gameId).emit("chat", {
        msg: `${player} is ready`,
        id: SERVER_TOKEN
      })
    }
    await updateRoom(data, room);
  })

  socket.on('overReady', async (data) => {
    const room: Room = await getRoom(data);
    room.readyCount++;
    console.log(room.id);
    if(room.readyCount === 2) {
      console.log("READY")
      // DELETE OLD GAME
      await deleteGame(data);
      createGame(data, room.host.socketId, room.other.socketId);
      const game: Game = await getGame(data);
      // console.log(game.gameId);
      game.startHand();
      await updateGame(game);
      io.in(game.gameId).emit("startGame", game);
      room.readyCount = 0;
    }
    await updateRoom(data, room);
  })

  socket.on('forfeit', async (data) => {
    await forfeit(data, io, socket);
  })

  socket.on('leave', async (data) => {
    const { id, started } = data;
    if (started) await forfeit(id, io, socket);

    const playerId = socket.id;

    // REMOVE PLAYER FROM ROOM
    const room: Room = await getRoom(id);
    room.users = room.users.filter(p => p.socketId !== playerId);
    socket.leave(playerId);

    io.in(id).emit("chat", {
      msg: `Opponent left the game`,
      id: SERVER_TOKEN
    });

    // REMOVE ROOM IF EMPTY
    if(room.users.length === 0) {
      await deleteRoom(id);
    } else {
      if(room.host.socketId === playerId) {
        room.host = room.other;
        room.other = null;

        io.in(id).emit("chat", {
          msg: `You are the new host!`,
          id: SERVER_TOKEN
        });
      } else {
        room.other = null;
      }
      await updateRoom(id, room);
    }
    // UPDATE ALL PLAYERS IN HOME
    io.emit("rooms", await getRooms());
  });
})

// httpsServer.listen(port);

app.get('/', (_, res) => {
  res.send('Hello World!');
})

connectToDatabase()
.then(() => {
  app.use("/db", trucoRouter);

  httpsServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  // app.listen(port, () => {
  //   console.log(`Running on port ${port}`)
  // })
})
.catch((error: Error) => {
  console.log(error);
  process.exit();
})