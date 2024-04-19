const mongoose = require ('mongoose');
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})

const { Schema } = mongoose;

const contactSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
       
    },
    message: {
        type: String,
        required: true,
    },
  
    verified: {
        type: Boolean,
        default: false,
      },
    
      otp: Number,
      otp_expiry: Date,

});

const ContactUser = mongoose.model('Contact-user', contactSchema);
module.exports = ContactUser;