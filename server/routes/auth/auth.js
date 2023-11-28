const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const { cloudinary } = require('../../utils/cloudinary');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ msg: "Invalid credentials" })
        }

        const accessToken = jwt.sign({ user }, config.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
        

        res.header('Authorization', `Bearer ${accessToken}`).json({ msg: "Authenticating",  accessToken: accessToken }).status(200);
    

    } catch (error) {
        console.log(error)
    }
})

router.post('/profilepicture', async (req, res) => {
    try {
        try {
            const data = req.body.data;
            const responseData = await cloudinary.uploader.upload(data, {

                upload_preset: 'profile_pic'
            })
            console.log(responseData)
            res.json({ msg: "Image uploaded successfully", responseData }).status(200);
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        
    }
})


router.post('/register', async (req, res) => {
    try {

        const { name, email, password, profilePic  } = req.body;
        console.log("Name",name, "Email",email, "Password",password, "Profile Picture",profilePic)
        
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profilePic,
            followers: [],
            following: []
        })
        await newUser.save();
        res.status(200).json({ msg: "User registered successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error" })
    }
})

router.get('/logout', (req, res) => {
    const token = req.header('Authorization');

    
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.ACCESS_TOKEN_SECRET);
        
        res.json({ msg: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
})

module.exports = router;