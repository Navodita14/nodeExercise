const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.send('User Not Found')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(payload);
    
    // attach the user to the job routes
    req.user = { userID: payload.userID, name: payload.name }
    // console.log(req.user);
    
    next()
  } catch (error) {
   res.send('Authentication invalid')
  }
}

module.exports = auth
