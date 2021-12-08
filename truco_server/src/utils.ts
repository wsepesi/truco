import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types";
import { Server, Socket } from "socket.io";
import { getGame, updateGame } from "./routes/routesUtils";

import Game from "./gameLogic";

export const forfeit = async (gameId: string, io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>, socket: Socket) => {
    const game: Game = await getGame(gameId);
    const playerId = socket.id;
    game.forfeit(playerId);
    await updateGame(game);
    io.in(game.gameId).emit("updateAll", game);

    const player = game.hostId === socket.id ? "host" : "other";
    io.in(game.gameId).emit("chat", {
      msg: `${player} forfeited the game`,
      id: SERVER_TOKEN
    });
}

export const SERVER_TOKEN = "SERVER_TOKEN";