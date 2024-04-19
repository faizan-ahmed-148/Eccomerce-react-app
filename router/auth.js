const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
require("../db/conn");
const User = require("../models/userSchema")
const ContactUser = require("../models/ContactScheme")
const Authentication = require("../middleware/Authentication")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})
const lodash = require("lodash")




router.post('/register', [

    body('name', 'enter a valid name').isLength({ min: 5 }),

    body('email', 'enter a valid email').isEmail(),
    body('phone', 'enter a valid phone').isLength({ min: 10 }),
    body('work', 'enter a valid work'),
    body('password', 'Password should be at least 7 chars long').isLength({ min: 7 }),
    body('cpassword', 'Password should be at least 7 chars long').isLength({ min: 7 }),

], async (req, res) => {
    // if error willl come 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" })
        } else if (req.body.password != req.body.cpassword) {
            return res.status(422).json({ error: "Password are not matching" })
        } else {
            
            // passsword hash 
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            const secPass2 = await bcrypt.hash(req.body.cpassword, salt)

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                work: req.body.work,
                phone: req.body.phone,
                password: secPass,
                cpassword: secPass2,

            })
            res.json({ user })
            //   user regstration 
            const userRegister = await user.save()
            if (userRegister) {
                res.status(201).json({ message: `(${user} )User Successsfully Register` })
            }
            else {
                res.status(422).json({ error: "failed to register" })
            }

        }

    } catch (err) {
        console.log(err);



    }
});







// Signin 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).send({ error: "please filled the data properly" });
    }
    try {
        const loginUser = await User.findOne({ email: email });
        if (!loginUser) {
            return res.status(400).send({ error: "not found" });
        }
        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (isMatch) {
            const token = await loginUser.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 15000000),
                httpOnly: true,
                secure: true  //it is applicable when we use https method
            })
            console.log(token);
            res.send({ message: "login success" });
        } else {
            res.status(400).send({ error: "please enter correct data" })
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

// Contact 
router.post('/contact', [

    body('username', 'enter a valid username').isLength({ min: 5 }),
    body('email', 'enter a valid email').isEmail(),
    body('message', 'enter a valid message'),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // USER CREATION IN DATBASE 


    try {
        const userExist = await ContactUser.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" })
        }


        else {

            const user = await ContactUser.create({
                username: req.body.username,
                email: req.body.email,
                subject: req.body.subject,
                message: req.body.message,


            })
            res.json({ user })
            console.log(user)
            //   user regstration 
            const userRegister = await user.save()
            if (userRegister) {
                res.status(201).json({ message: `${user}  User Successsfully Register` })
            }
            else {
                res.status(422).json({ error: "failed to register" })
            }
        }

    } catch (err) {
        console.log(err);
    }


});






router.get("/contact", Authentication, (req, res) => {
    res.send(req.rootUser);
})


router.get("/logout", Authentication, (req, res) => {
    res.clearCookie("jwtoken");
    console.log("logout");
    res.status(400).send("user logout")
})


module.exports = router 