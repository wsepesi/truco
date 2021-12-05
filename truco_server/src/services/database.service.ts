import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";

export const collections: { users?: mongoDB.Collection } = {}

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

    console.log(process.env.USERS_COLLECTION_NAME);
   
    const usersCollection: mongoDB.Collection | null = process.env.USERS_COLLECTION_NAME ? db.collection(process.env.USERS_COLLECTION_NAME) : null;
 
    if (!usersCollection) return;
    
    collections.users = usersCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}