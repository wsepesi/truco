import Game from "../gameLogic";
import { GameType } from "../types";
import { ObjectId } from "mongodb";
import Room from "../models/room";
import { collections } from "../services/database.service";

export const getRooms = async (): Promise<Room[]> => {
    try {
        const rooms = collections.rooms ? (await collections.rooms.find({}).toArray()) as unknown as Room[] : null;
        
        return rooms;
        // res.status(200).send(room);
    } catch (error) {
        return null;
        // res.status(404).send(`Unable to find matching document with id: ${req.params.id}`)
    }
}

export const getRoom = async (roomId: string): Promise<Room> => {
    try {
        console.log(roomId);
        const room = collections.rooms ? (await collections.rooms.findOne({ _id: new ObjectId(roomId) }) as unknown as Room) : null;
        console.log(room);
        return room;
    } catch (error) {
        return null;
    }
}

export const updateRoom = async (id: string, room: Room) => {
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.rooms.updateOne(query, { $set: room });
        if (!result) throw new Error("Unable to update room");
    } catch (error) {
        throw error;
    }
}

export const getGames = async (): Promise<Game[]> => { 
    try {
        const games = collections.games ? (await collections.games.find({}).toArray()) as unknown as Game[] : null;

        return games;
    } catch (error) {
        return null;
    }
}

export const getGame = async (id: string): Promise<Game> => {
    try {
        const query = { gameId: id };
        const gameData: GameType = collections.games ? (await collections.games.findOne(query)) as unknown as GameType: null;
        const game: Game = Game.fromDb(gameData);
        
        console.log("game", game);
        // const game = new Game(gameData.gameId, gameData.hostId, gameData.otherId);
        if (!game) throw new Error("Game not found");
        return game;
    } catch (error) {
        return null;
    }
};

export const updateGame = async (game: Game) => {
    try {
        const query = { gameId: game.gameId };
        const result = await collections.games.updateOne(query, { $set: game });
        if (!result) throw new Error("Game not found");
    } catch (error) {
        throw new Error(error);
    }
}

export const createGame = async (gameId: string, hostId: string, otherId: string) => {
    try {
        console.log(gameId, hostId, otherId);
        const game: Game = Game.newGame(gameId, hostId, otherId);
        const result = collections.games ? await collections.games.insertOne(game) : null;
        if(!result) throw new Error('Game not created');
    } catch (error) {
        throw new Error(error);
    }
}