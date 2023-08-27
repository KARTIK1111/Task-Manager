const { sign } = require('jsonwebtoken')
const userModel = require('../model/userModel')
const { validname, validEmail, validPassword } = require('../validations/validators')
const { hash, compareSync } = require('bcrypt')
require('dotenv').config({ port: ".env" })

//---------------------------------------------- Create User-------------------------------------------------------------------------------//
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //making sure user must enter some data to proceed
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: 'Enter Required Data' })

        //validating username, it should be string
        if (!validname(username)) return res.status(400).send({ status: false, message: 'Enter Valid Username ' })

        //validating email, email should be in proper format
        if (!validEmail(email)) return res.status(400).send({ status: false, message: 'Enter Valid email' })
        let checkEmail = await userModel.findOne({ email: email })
        if (checkEmail) return res.status(400).send({ status: false, message: 'Given email already exist ,Enter unique email' })

        //validating password and also using hash function to encrypt the password 
        if (!validPassword(password)) return res.status(400).send({ status: false, message: 'Enter Valid password ,A password should be at least one Capital Letter,Special Character and Number and between 8 to 15 in range' })
        req.body.password = await hash(password, 10)

        //creating username, email and password
        const create = await userModel.create(req.body)
        return res.status(201).send({ status: true, message: 'user created', userdata: create })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------user Login -------------------------------------------------------------------------------//
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: 'Enter Required Data' })
        //email and password should be valid 
        if (!validEmail(email)) return res.status(400).send({ status: false, message: 'Enter Valid Email' })
        if (!validPassword(password)) return res.status(400).send({ status: false, message: 'Enter Valid Password' })

        //checking if email already exist 
        const login = await userModel.findOne({ email: email })
        if (!login) return res.status(404).send({ status: false, message: 'Entered Email Does not Exist, Enter valid email' })

        //Matching given password with original passowrd
        const pass = compareSync(password, login.password)
        if (!pass) return res.status(400).send({ status: false, message: 'Wrong Password' })

        //Generating jasonwebtoken by signing in user
        sign({ userId: login._id }, process.env.SECRET_KEY, { expiresIn: '24hr' }, (error, token) => {
            if (error) return res.status(400).send({ status: false, message: error.message })
            res.header('authorization', token)
            return res.status(200).send({ staus: true, message: 'User login Successfully' })
        })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = { createUser, login }