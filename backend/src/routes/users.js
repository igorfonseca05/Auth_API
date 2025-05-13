const express = require('express')
const route = express.Router()

// Controllers da rota users
const { getUser, signup } = require('../controller/userController')

const validor = require('../middlewares/middle_Validator')


route.get('/', getUser)
route.post('/signup', validor, signup)

module.exports = route