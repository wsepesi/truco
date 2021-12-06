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
exports.trucoRouter = void 0;
const routesUtils_1 = require("./routesUtils");
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const room_1 = __importDefault(require("../models/room"));
const database_service_1 = require("../services/database.service");
exports.trucoRouter = express_1.default.Router();
exports.trucoRouter.use(express_1.default.json());
// GET USERS
exports.trucoRouter.get("/users", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = database_service_1.collections.users ? (yield database_service_1.collections.users.find({}).toArray()) : null;
        if (!users)
            throw new Error("User not found / databsae error");
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// // GET USER BY ID
// trucoRouter.get("users/:id", async (req: Request, res: Response) => {
//     const id = req?.params?.id;
//     try {
//         const query = { _id: new ObjectId(id) };
//         const user = collections.users ? (await collections.users.findOne(query)) as unknown as User : null;
//         if(!user) throw new Error("User not found / databsae error");
//         res.status(200).send(user);
//     } catch (error) {
//         res.status(404).send(`Unable to find matching document with id: ${req.params.id}`)
//     }
// });
// GET USER BY SOCKETID
exports.trucoRouter.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { socketId: id };
        const user = database_service_1.collections.users ? (yield database_service_1.collections.users.findOne(query)) : null;
        if (!user)
            throw new Error("User not found / databsae error");
        res.status(200).send(user);
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// ADD USER
exports.trucoRouter.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("trying to add user", req.body);
        const user = req.body;
        const result = database_service_1.collections.users ? yield database_service_1.collections.users.insertOne(user) : null;
        result ? res.status(201).send({
            msg: `Successfully created user with id: ${result.insertedId}`,
            success: true,
            id: result.insertedId
        }) : res.status(500).send({
            msg: "Unable to create user",
            success: false
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
// DELETE USER
exports.trucoRouter.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = database_service_1.collections.users ? yield database_service_1.collections.users.deleteOne(query) : null;
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
// PUT EXAMPLE
// gamesRouter.put("/:id", async (req: Request, res: Response) => {
//     const id = req?.params?.id;
//     try {
//         const updatedGame: Game = req.body as Game;
//         const query = { _id: new ObjectId(id) };
//         const result = await collections.games.updateOne(query, { $set: updatedGame });
//         result
//             ? res.status(200).send(`Successfully updated game with id ${id}`)
//             : res.status(304).send(`Game with id: ${id} not updated`);
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
// });
// GET ROOMS
exports.trucoRouter.get("/rooms", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting rooms");
    try {
        const result = yield (0, routesUtils_1.getRooms)();
        if (!result)
            throw new Error("Room not found / databsae error");
        res.status(200).send(result);
        // } catch (error) {
        //     const rooms = collections.rooms ? (await collections.rooms.find({}).toArray()) as unknown as Room[] : null;
        //     if(!rooms) throw new Error("Room not found / databsae error");
        //     res.status(200).send(rooms);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// GET ROOM BY ID
exports.trucoRouter.get("/rooms/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const room = database_service_1.collections.rooms ? (yield database_service_1.collections.rooms.findOne(query)) : null;
        if (!room)
            throw new Error("Room not found / databsae error");
        res.status(200).send(room);
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// ADD ROOM
exports.trucoRouter.post("/rooms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("trying to add room", req.body);
    try {
        const { name, host } = req.body;
        const room = new room_1.default(name, host);
        const result = database_service_1.collections.rooms ? yield database_service_1.collections.rooms.insertOne(room) : null;
        result ? res.status(201).send({
            msg: `Successfully created room with id: ${result.insertedId}`,
            success: true,
            id: result.insertedId
        }) : res.status(500).send({
            msg: "Unable to create room",
            success: false
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
// EDIT ROOM
exports.trucoRouter.put("/rooms/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
        const playerId = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.playerId;
        console.log("ids", id, playerId);
        const query = { _id: new mongodb_1.ObjectId(id) };
        const roomData = database_service_1.collections.rooms ? (yield database_service_1.collections.rooms.findOne(query)) : null;
        const room = roomData ? new room_1.default(roomData.name, roomData.host) : null;
        const playerQuery = { socketId: playerId };
        const user = database_service_1.collections.users ? (yield database_service_1.collections.users.findOne(playerQuery)) : null;
        console.log(room, user);
        if (!room || !user)
            throw new Error("Room not found");
        console.log(room, user);
        room.joinRoom(user);
        (0, routesUtils_1.createGame)(id, room.host.socketId, room.other.socketId);
        const result = yield database_service_1.collections.rooms.updateOne(query, { $set: room });
        result
            ? res.status(200).send({
                msg: `Successfully updated game with id ${id}`,
                success: true,
                id
            })
            : res.status(304).send({
                msg: `Game with id: ${id} not updated`,
                success: false,
                id
            });
        // const room = req.body as Room;
        // const result = collections.rooms ? await collections.rooms.insertOne(room) : null;
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
// GET GAMES
exports.trucoRouter.get("/games", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, routesUtils_1.getGames)();
        if (!result)
            throw new Error("Game not found / databsae error");
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// GET GAME BY ID
exports.trucoRouter.get("/games/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const id = (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.id;
    try {
        const game = (0, routesUtils_1.getGame)(id);
        // const query = { _id: new ObjectId(id) };
        // const game = collections.games ? (await collections.games.findOne(query)) as unknown as Game : null; //FIXME:
        if (!game)
            throw new Error("Game not found / databsae error");
        res.status(200).send(game);
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// ADD GAME
exports.trucoRouter.post("/games", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = req.body;
        const result = database_service_1.collections.games ? yield database_service_1.collections.games.insertOne(game) : null;
        result ? res.status(201).send({
            msg: `Successfully created game with id: ${result.insertedId}`,
            success: true,
            id: result.insertedId
        }) : res.status(500).send({
            msg: "Unable to create game",
            success: false
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
//
//# sourceMappingURL=truco.router.js.map