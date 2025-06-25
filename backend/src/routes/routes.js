const express = require('express')
const routes = express.Router()

const users = require('./users')

// Rotas users
routes.use('/api/users', users)


routes.use((req, res) => {
    res.send('Rota não encontrada')
})

module.exports = routes