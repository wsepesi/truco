import express from "express";
import { getDb } from "../db/conn";

export const trucoRoutes = express.Router();

export type User = {
    id: number | null;
    username: string;
    socketId: string;
}

trucoRoutes.route("/users").get((_, res) => {
    getDb().collection("users").find({}).toArray((err: any, users: User[]) => {
        if (err) throw err;
        res.json(users);
    });
});

trucoRoutes.route("/users/:id").get((req, res) => {
    getDb().collection("users").findOne({ id: req.params.id }, (err: any, user: User) => {
        if (err) throw err;
        res.json(user);
    });
});

trucoRoutes.route("/users/add").post((req, res) => {
    getDb().collection("users").insertOne(req.body, (err: any, result: User) => {
        if (err) throw err;
        res.json(result);
    });
});

