"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require('dotenv').config({ path: './config.env' });
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(require("./routes/record"));
const dbo = require('./db/conn');
app.get('/', (_, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log(`Running on port ${port}`);
});
//TODO:
// add routing file, see https://mongodb.com/languages/mern-stack-tutorial
//# sourceMappingURL=index.js.map