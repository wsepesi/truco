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
exports.createGame = exports.getGame = exports.getGames = exports.getRooms = void 0;
const gameLogic_1 = __importDefault(require("../gameLogic"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
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
        const query = { _id: new mongodb_1.ObjectId(id) };
        const game = database_service_1.collections.games ? (yield database_service_1.collections.games.findOne(query)) : null;
        if (!game)
            throw new Error("Game not found");
        return game;
    }
    catch (error) {
        return null;
    }
});
exports.getGame = getGame;
const createGame = (gameId, hostId, otherId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(gameId, hostId, otherId);
        const game = new gameLogic_1.default(gameId, hostId, otherId);
        const result = database_service_1.collections.games ? yield database_service_1.collections.games.insertOne(game) : null;
        if (!result)
            throw new Error('Game not created');
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createGame = createGame;
//# sourceMappingURL=routesUtils.js.map