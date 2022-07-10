const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { create, find, findAll, findAllPublished, deleteAll, updateOne } = require('./controllers/tutorial.controller')
const { signin, signup } = require('./controllers/auth.controller')
const { checkRolesExisted, checkDuplicateUser } = require('./middlewares')
const db = require('./models')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))

const PORT = process.env.PORT || 8080

app.post('/api/auth/signup', [checkDuplicateUser, checkRolesExisted], signup)

app.post('/api/auth/signin', signin)

app.post('/api/tutorials', create)

app.get('/api/tutorials/:id', find)

app.get('/api/tutorials', findAll)

app.get('/api/tutorials/published', findAllPublished)

app.put('/api/tutorials/:id', updateOne)

app.delete('/api/tutorials', deleteAll)

app.delete('/api/tutorials/:id', deleteAll)

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`)
  await db.sequelize.sync()
})

module.exports = app
