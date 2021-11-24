import { MongoClient } from "mongodb";
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
var _db: any;
 
const connectToServer = (callback: any) => {
    client.connect(function (err, db) {
        // Verify we got a good "db" object
        if (db) {
            _db = db.db("myFirstDatabase");
            console.log("Successfully connected to MongoDB.");
        }
        return callback(err);
    });
}
export function getDb() {
    return _db;
}

export default connectToServer;