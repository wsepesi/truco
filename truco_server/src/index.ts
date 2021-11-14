import cors from 'cors'
import express from 'express'
require('dotenv').config({ path: './config.env'})

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(require("./routes/record"));

const dbo = require('./db/conn');

app.get('/', (_, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  dbo.connectToServer((err: any) => { //TODO: type
    if (err) {
      console.log(err);
    }
  });
  console.log(`Running on port ${port}`)
})

//TODO:
// add routing file, see https://mongodb.com/languages/mern-stack-tutorial
