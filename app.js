const express = require('express')

const app = express()
const cookieParser = require('cookie-parser');
const connectToMongo = require ("./db/conn");
connectToMongo();
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})

app.use(express.json());
app.use(cookieParser())
app.use(require('./router/auth'))



// heruku setup 
const PORT = process.env.PORT || 5000;


if ( process.env.NODE_ENV == "production"){

  app.use(express.static("frontend/build"));

  const path = require("path");

  app.get("*", (req, res) => {

      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

  })


}


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  