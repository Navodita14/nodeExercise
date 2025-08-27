const express= require('express')
const routes= express.Router()

const{login, register, profile}= require('../controller/auth')
const {  authenticate } = require('../middleware/auth')

routes.post(`/login`,login)
routes.post(`/register`, register)
routes.get(`/profile`,authenticate,profile)

module.exports=routes

