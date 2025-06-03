
const express = require('express')
const { dbEvents } = require('./db/connect')
const routes = require('../backend/src/routes/routes')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}))
app.use(cookieParser()) // Importante para ler cookies



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })
})

app.use(routes)

module.exports = { app, mongoose }