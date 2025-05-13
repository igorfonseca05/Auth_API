const Events = require('events')
const mongoose = require('mongoose')

const dbEvents = new Events()

mongoose.connect(process.env.STRING_DB_CONNECTION)
    .then(() => {
        console.log('conectado a base de dados')
        dbEvents.emit('connected')
    })
    .catch((error) => {
        console.log(error)
    })

module.exports = { dbEvents }



