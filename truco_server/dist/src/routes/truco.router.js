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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.trucoRouter = express_1.default.Router();
exports.trucoRouter.use(express_1.default.json());
exports.trucoRouter.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.trucoRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const user = database_service_1.collections.users ? (yield database_service_1.collections.users.findOne(query)) : null;
        if (!user)
            throw new Error("User not found / databsae error");
        res.status(200).send(user);
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
exports.trucoRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = database_service_1.collections.users ? yield database_service_1.collections.users.insertOne(user) : null;
        result ? res.status(201).send(`Successfully created user with id: ${result.insertedId}`) : res.status(500).send("Unable to create user");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
exports.trucoRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = database_service_1.collections.users ? yield database_service_1.collections.users.deleteOne(query) : null;
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
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
//# sourceMappingURL=truco.router.js.map