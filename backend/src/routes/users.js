const express = require('express')
const route = express.Router()

// Controllers da rota users
const { getUser, signup, login } = require('../controller/userController')

const validor = require('../middlewares/middle_Validator')


route.get('/', getUser)
route.post('/signup', signup)
route.post('/login', login)


route.use((req, res) => {
    console.log('Rota não encontrada')
})

module.exports = route