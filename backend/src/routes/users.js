const express = require('express')
const route = express.Router()

// Controllers da rota users
const { getUser, signup, login, updateUserProfile, getUsers } = require('../controller/userController')

const validor = require('../middlewares/middle_Validator')
const validateToken = require('../middlewares/validateToken')


// Criar usuário
route.post('/signup', signup)

// autenticar usuário
route.post('/login', login)

// Obter usuários adicionados
route.get('/', getUsers)

// Obter usuários adicionados
route.get('/:id', getUser)


// route.patch('/profile/:id', updateUserProfile)


route.use((req, res) => {
    console.log('Rota não encontrada')
})

module.exports = route