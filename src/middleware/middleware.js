require('dotenv').config({ port: '.env' })
const { verify } = require('jsonwebtoken')

//------------------------------------------- Authentication ---------------------------------------------------------------------------------//
Authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (!token) return res.status(400).send({ status: false, message: 'token is not present' })

    //Removing 'Bearer' word from token
    token = token.split(' ')[1]

    //Verifying the token using the SECRET_KEY 
    verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) return res.status(401).send({ status: false, message: err.message })
      else {
        let userId = decodedToken.userId
        //setting userId in the request object 
        req['user_name'] = userId
        next()
      }
    })
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = { Authentication }