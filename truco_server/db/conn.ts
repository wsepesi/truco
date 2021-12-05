const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const uri = "mongodb+srv://trucoAdmin:pass@truco.jwra1.mongodb.net/truco?retryWrites=true&w=majority"
console.log(Db);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
let _db: any;
 

export const connectToServer = (callback: any) => {
    console.log("ello client");
    console.log(client)
    client.connect(function (err: any, db: any) {
        console.log("trying to connect")
        // Verify we got a good "db" object
        if (db) {
            console.log("db obj exists");
            _db = db.db("truco");
            console.log("Successfully connected to MongoDB."); 
        }
        else {
            console.log("Failed to connect to MongoDB.");
        }
        return callback(err);
    });
}

export const getDb = () => {
    return _db;
}

// module.exports = {
//   connectToServer: function (callback: any) {
//     client.connect(function (err: any, db: any) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db("myFirstDatabase");
//         console.log("Successfully connected to MongoDB."); 
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };