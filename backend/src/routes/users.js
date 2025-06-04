const express = require('express')
const route = express.Router()

// Controllers da rota users
const {
    getMyProfile,
    signup,
    login,
    updateMyProfile,
    getUsers,
    logout,
    logoutAll,
    deleteMyAccount
} = require('../controller/userController')

const validor = require('../middlewares/middle_Validator')
const validateToken = require('../middlewares/validateToken')

// Public
route.post('/signup', signup)
route.post('/login', login)

// Private
route.get('/me', validateToken, getMyProfile) // Obter usuários adicionados
route.patch('/me', validateToken, updateMyProfile)
route.delete('/me', validateToken, deleteMyAccount) // dele user Account

route.post('/logout', validateToken, logout) // Rota de logout
route.post('/logoutAll', validateToken, logoutAll) // Rota de logout todas as contas




// route.patch('/profile/:id', updateUserProfile)


route.use((req, res) => {
    console.log('Rota não encontrada')
})

module.exports = route