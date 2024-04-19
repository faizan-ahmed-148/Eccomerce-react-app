const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{

        token: {
            type: String,
            required: true
            }
    }],
  resetLink: {
    data: String,
    default: ""
  },
    resetToken:String,
    expireToken:Date
});
userSchema.methods.generateAuthToken = async function (){
    try {
        let token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({token: token})
        await this.save()
        return token
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;