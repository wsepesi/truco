import { createGame, getGames, getRooms } from "./routesUtils";
import express, { Request, Response } from "express";

import Game from "../gameLogic";
import { ObjectId } from "mongodb";
import Room from "../models/room";
import User from "../models/user";
import { collections } from "../services/database.service";

export const trucoRouter = express.Router();
trucoRouter.use(express.json());

// GET USERS
trucoRouter.get("/users", async (_: Request, res: Response) => {
    try {
        const users = collections.users ? (await collections.users.find({}).toArray()) as unknown as User[] : null;

        if(!users) throw new Error("User not found / databsae error");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

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
trucoRouter.get("/users/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { socketId: id };
        const user = collections.users ? (await collections.users.findOne(query)) as unknown as User : null;
        
        if(!user) throw new Error("User not found / databsae error");
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`)
    }
});

// ADD USER
trucoRouter.post("/users", async (req: Request, res: Response) => {
    try {
        console.log("trying to add user", req.body)
        const user = req.body as User;
        const result = collections.users ? await collections.users.insertOne(user) : null;

        result ? res.status(201).send({
            msg: `Successfully created user with id: ${result.insertedId}`,
            success: true,
            id: result.insertedId 
        }) : res.status(500).send({
            msg: "Unable to create user",
            success: false
        });
        } catch (error: unknown) {
        console.error(error);
        res.status(400).send(error);
    }
});

// DELETE USER
trucoRouter.delete("/users/:id", async (req: Request, res: Response) => {
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


// GET ROOMS
trucoRouter.get("/rooms", async (_: Request, res: Response) => {
    console.log("getting rooms");
    try {
        const result = await getRooms();
        if(!result) throw new Error("Room not found / databsae error");
        res.status(200).send(result);
    // } catch (error) {
    //     const rooms = collections.rooms ? (await collections.rooms.find({}).toArray()) as unknown as Room[] : null;

    //     if(!rooms) throw new Error("Room not found / databsae error");
    //     res.status(200).send(rooms);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET ROOM BY ID
trucoRouter.get("/rooms/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const room = collections.rooms ? (await collections.rooms.findOne(query)) as unknown as Room : null;
        
        if(!room) throw new Error("Room not found / databsae error");
        res.status(200).send(room);
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`)
    }
});

// ADD ROOM
trucoRouter.post("/rooms", async (req: Request, res: Response) => {
    console.log("trying to add room", req.body)
    try {
        const { name, host} = req.body;
        const room = new Room(name, host);
        const result = collections.rooms ? await collections.rooms.insertOne(room) : null;

        result ? res.status(201).send({
            msg: `Successfully created room with id: ${result.insertedId}`,
            success: true,
            id: result.insertedId 
        }) : res.status(500).send({
            msg: "Unable to create room",
            success: false
        });
        } catch (error: unknown) {
        console.error(error);
        res.status(400).send(error);
    }
});

// EDIT ROOM
trucoRouter.put("/rooms/:id", async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id;
        const playerId = req?.body?.playerId;

        console.log("ids", id, playerId);

        const query = { _id: new ObjectId(id) };
        const roomData = collections.rooms ? (await collections.rooms.findOne(query)) as unknown as Room : null;
        const room = roomData ? new Room(roomData.name, roomData.host) : null;
        const playerQuery = { socketId: playerId };
        const user = collections.users ? (await collections.users.findOne(playerQuery)) as unknown as User : null;
        if (!room || !user) throw new Error("Room not found");

        console.log(room, user);

        room.joinRoom(user);
        createGame(id, room.host.socketId, room.other.socketId);

        const result = await collections.rooms.updateOne(query, { $set: room });

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
        } catch (error: unknown) {
            console.error(error);
            res.status(400).send(error);
    }
});

// GET GAMES
trucoRouter.get("/games", async (_: Request, res: Response) => {
    try {
        const result = await getGames();
        if(!result) throw new Error("Game not found / databsae error");
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET GAME BY ID
trucoRouter.get("/games/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const game = collections.games ? (await collections.games.findOne(query)) as unknown as Game : null; //FIXME:
        
        if(!game) throw new Error("Game not found / databsae error");
        res.status(200).send(game);
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`)
    }
});

// ADD GAME
trucoRouter.post("/games", async (req: Request, res: Response) => {
    try {
        const game = req.body as Game;
        const result = collections.games ? await collections.games.insertOne(game) : null;

        result ? res.status(201).send({
            msg: `Successfully created game with id: ${result.insertedId}`,
            success: true,
            id: result.insertedId 
        }) : res.status(500).send({
            msg: "Unable to create game",
            success: false
        });
        } catch (error: unknown) {
        console.error(error);
        res.status(400).send(error);
    }
});

//
