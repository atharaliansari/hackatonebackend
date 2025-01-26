const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')

const authRoute = express.Router();

// signUp
authRoute.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(401).json({ message: 'Validation error' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(404).json({ isSuccessfully: false, message: 'Is Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({ isSuccessfully: true, message: "user successfully created", data: newUser })

    } catch (error) {
        return res.status(412).json({ isSuccessfully: false, message: 'Internal server error', error })
    }
})


//Login
authRoute.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ message: 'Validation error' })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ isSuccessfully: false, message: 'Email not Found' })
        }

        const isMatchedPassword = await bcrypt.compare(password, existingUser.password)
        if (!isMatchedPassword) {
            return res.status(401).json({ message: 'Invalid Password' })
        }

        res.status(201).json({ isSuccessfully: true, message: 'User is Successfully Logged In' })

    } catch (error) {
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error })
    }
})

module.exports = authRoute;