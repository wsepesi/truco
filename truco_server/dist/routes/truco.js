"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trucoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const conn_1 = require("../db/conn");
exports.trucoRoutes = express_1.default.Router();
exports.trucoRoutes.route("/users").get((_, res) => {
    (0, conn_1.getDb)().collection("users").find({}).toArray((err, users) => {
        if (err)
            throw err;
        res.json(users);
    });
});
exports.trucoRoutes.route("/users/:id").get((req, res) => {
    (0, conn_1.getDb)().collection("users").findOne({ id: req.params.id }, (err, user) => {
        if (err)
            throw err;
        res.json(user);
    });
});
exports.trucoRoutes.route("/users/add").post((req, res) => {
    (0, conn_1.getDb)().collection("users").insertOne(req.body, (err, result) => {
        if (err)
            throw err;
        res.json(result);
    });
});
//# sourceMappingURL=truco.js.map