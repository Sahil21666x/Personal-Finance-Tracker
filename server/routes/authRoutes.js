import express from "express";
const router = express.Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/User.js";


router.post('/register', async (req, res) => {

    try {
        const { email, password, name } = req.body

        if (!email || !password) return res.status(400).send({ sucess: false, status: "Please Enter Valid Credentials" })

        const existingUser = await User.findOne({ email: email })

        if (existingUser) return res.status(400).json({ message: "User already Exists" })

        const userObj = req.body

        const user = await User.create(userObj);  // user = new User({email,pass,name})

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.name = name.trim()
        user.save()

        res.status(201).json({ message: "User Created Successfully !" })

    } catch (error) {
        res.status(400).json(error);
        console.log("error in resgister :", error);

    }

})

router.post('/login', async (req, res) => {
    try {        
        const { email, password } = req.body

        if (!email || !password) return res.status(400).send({ sucess: false, status: "Please Enter Valid Credentials" })

        const user = await User.findOne({ email: email })

        if (!user) return res.status(400).json({ message: "Invalid Credentials : User Not found" })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ message: "Incorrect Password" })

        const token = 
        jwt.sign({ userId: user._id, name: user.name, email: email, password: password }
                , process.env.SECRET_KEY)

        res
            .status(200)
            .json({
                message: "Login Successful",
                token: token,
            })

    } catch (error) {
        console.log("error in login :", error);
        res.status(400).json(error)
    }
})

export default router