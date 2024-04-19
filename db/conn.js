const mongoose = require ('mongoose');
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})
const mongoURI = process.env.DATABASE;
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connect To Mongo Successfully");
    })
}
module.exports = connectToMongo;

