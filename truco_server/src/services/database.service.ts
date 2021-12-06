import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";

export const collections: { 
    users?: mongoDB.Collection,
    rooms?: mongoDB.Collection,
    games?: mongoDB.Collection,
} = {}

export const connectToDatabase = async () => {

    dotenv.config();

    console.log("Connecting to database...")

    console.log(process.env.DB_CONN_STRING);

    const client: mongoDB.MongoClient | null = process.env.DB_CONN_STRING ? new mongoDB.MongoClient(process.env.DB_CONN_STRING) : null;
    console.log(client);
            
    if (!client) return;

    console.log("connecting to client...")
    
    await client.connect();

    console.log("connected to client...")

    console.log(process.env.DB_NAME);
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    console.log(db);

    // CONNECT TO INDIVIDUAL COLLECTIONS

    // USERS
    console.log(process.env.USERS_COLLECTION_NAME);
    const usersCollection: mongoDB.Collection | null = process.env.USERS_COLLECTION_NAME ? db.collection(process.env.USERS_COLLECTION_NAME) : null;
    if (!usersCollection) return;
    collections.users = usersCollection;
    console.log(`Successfully connected to collection: ${usersCollection.collectionName}`);

    // ROOMS
    console.log(process.env.ROOMS_COLLECTION_NAME);
    const roomsCollection: mongoDB.Collection | null = process.env.ROOMS_COLLECTION_NAME ? db.collection(process.env.ROOMS_COLLECTION_NAME) : null;
    if (!roomsCollection) return;
    collections.rooms = roomsCollection;
    console.log(`Successfully connected to collection: ${roomsCollection.collectionName}`);

    // GAMES
    console.log(process.env.GAMES_COLLECTION_NAME);
    const gamesCollection: mongoDB.Collection | null = process.env.GAMES_COLLECTION_NAME ? db.collection(process.env.GAMES_COLLECTION_NAME) : null;
    if (!gamesCollection) return;
    collections.games = gamesCollection;
    console.log(`Successfully connected to collection: ${gamesCollection.collectionName}`);
}