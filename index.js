const express = require('express')
const app = express()
const router = require('./src/routes/router')

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

app.use(express.json())
app.use('/', router)


mongoose.connect(process.env.MongoDB)
    .then(() => { console.log('MongoDB is connected') })
    .catch((error) => { console.log(error); })

app.listen(process.env.PORT, () => {
    console.log('App is running on port', + process.env.PORT)
})