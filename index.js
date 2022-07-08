const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { create, find, findAll, findAllPublished, deleteAll } = require('./controllers/tutorial.controller')
const db = require('./models')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))


const PORT = process.env.PORT || 8080

app.post('/tutorial', create)

app.get('/tutorials/:id', find)

app.get('/tutorials', findAll)

app.get('/tutorials/published', findAllPublished)

app.delete('/tutorials', deleteAll)

app.delete('/tutorials/:id', deleteAll)

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`)
    await db.sequelize.sync()
})

module.exports = app