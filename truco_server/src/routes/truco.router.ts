import express, { Request, Response } from "express";

import { ObjectId } from "mongodb";
import User from "../models/user";
import { collections } from "../services/database.service";

export const trucoRouter = express.Router();
trucoRouter.use(express.json());

trucoRouter.get("/", async (_: Request, res: Response) => {
    try {
        const users = collections.users ? (await collections.users.find({}).toArray()) as unknown as User[] : null;

        if(!users) throw new Error("User not found / databsae error");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

trucoRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const user = collections.users ? (await collections.users.findOne(query)) as unknown as User : null;
        
        if(!user) throw new Error("User not found / databsae error");
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`)
    }
});

trucoRouter.post("/", async (req: Request, res: Response) => {
    
    try {
        const user = req.body as User;
        const result = collections.users ? await collections.users.insertOne(user) : null;

        result ? res.status(201).send(`Successfully created user with id: ${result.insertedId}`) : res.status(500).send("Unable to create user");
    } catch (error: unknown) {
        console.error(error);
        res.status(400).send(error);
    }
});

trucoRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = collections.users ? await collections.users.deleteOne(query) : null;

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

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
