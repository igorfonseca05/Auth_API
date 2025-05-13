require('dotenv').config()

const express = require('express')
const { dbEvents } = require('./db/connect')
const routes = require('../backend/src/routes/routes')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}))


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})

app.use(routes)

dbEvents.on('connected', () => {
    app.listen(5000, () => {
        console.log('Servidor on')
        console.log('Acesse em http://localhost:5000')
    })
})


