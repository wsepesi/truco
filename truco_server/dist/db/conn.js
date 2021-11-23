"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = void 0;
const mongodb_1 = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new mongodb_1.MongoClient(Db);
var _db;
const connectToServer = (callback) => {
    client.connect(function (err, db) {
        // Verify we got a good "db" object
        if (db) {
            _db = db.db("myFirstDatabase");
            console.log("Successfully connected to MongoDB.");
        }
        return callback(err);
    });
};
function getDb() {
    return _db;
}
exports.getDb = getDb;
exports.default = connectToServer;
//# sourceMappingURL=conn.js.map