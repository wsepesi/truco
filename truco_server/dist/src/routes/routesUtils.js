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
exports.deleteGame = exports.createGame = exports.updateGame = exports.getGame = exports.getGames = exports.deleteRoom = exports.updateRoom = exports.getRoom = exports.getRooms = exports.getUser = void 0;
const gameLogic_1 = __importDefault(require("../gameLogic"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const getUser = (socketId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = database_service_1.collections.users ? yield database_service_1.collections.users.findOne({ socketId }) : null;
    if (!user)
        throw new Error("User not found");
    return user;
});
exports.getUser = getUser;
const getRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = database_service_1.collections.rooms ? (yield database_service_1.collections.rooms.find({}).toArray()) : null;
        return rooms;
        // res.status(200).send(room);
    }
    catch (error) {
        return null;
        // res.status(404).send(`Unable to find matching document with id: ${req.params.id}`)
    }
});
exports.getRooms = getRooms;
const getRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(roomId);
        const room = database_service_1.collections.rooms ? yield database_service_1.collections.rooms.findOne({ _id: new mongodb_1.ObjectId(roomId) }) : null;
        // console.log(room);
        return room;
    }
    catch (error) {
        return null;
    }
});
exports.getRoom = getRoom;
const updateRoom = (id, room) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.rooms.updateOne(query, { $set: room });
        if (!result)
            throw new Error("Unable to update room");
    }
    catch (error) {
        throw error;
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.rooms.deleteOne(query);
        if (!result)
            throw new Error("Unable to delete room");
    }
    catch (error) {
        throw error;
    }
});
exports.deleteRoom = deleteRoom;
const getGames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = database_service_1.collections.games ? (yield database_service_1.collections.games.find({}).toArray()) : null;
        return games;
    }
    catch (error) {
        return null;
    }
});
exports.getGames = getGames;
const getGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id);
        const query = { gameId: id };
        const gameData = database_service_1.collections.games ? (yield database_service_1.collections.games.findOne(query)) : null;
        const game = gameLogic_1.default.fromDb(gameData);
        // console.log("game", game);
        // const game = new Game(gameData.gameId, gameData.hostId, gameData.otherId);
        if (!game)
            throw new Error("Game not found");
        return game;
    }
    catch (error) {
        return null;
    }
});
exports.getGame = getGame;
const updateGame = (game) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isOver = game.endOfGame;
        if (isOver) {
            const winnerId = game.hostPoints > game.otherPoints ? game.hostId : game.otherId;
            // INCREASE WINS OF WINNER BY 1 IN DB
            const query = { socketId: winnerId };
            const result = yield database_service_1.collections.users.updateOne(query, { $inc: { wins: 1 } });
            if (!result)
                throw new Error("Unable to update user");
        }
        const query = { gameId: game.gameId };
        const result = yield database_service_1.collections.games.updateOne(query, { $set: game });
        if (!result)
            throw new Error("Game not found");
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateGame = updateGame;
const createGame = (gameId, hostId, otherId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(gameId, hostId, otherId);
        const game = gameLogic_1.default.newGame(gameId, hostId, otherId);
        const result = database_service_1.collections.games ? yield database_service_1.collections.games.insertOne(game) : null;
        if (!result)
            throw new Error('Game not created');
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createGame = createGame;
const deleteGame = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { gameId };
        const result = yield database_service_1.collections.games.deleteOne(query);
        if (!result)
            throw new Error("Game not found");
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteGame = deleteGame;
//# sourceMappingURL=routesUtils.js.map