const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { create, find, findAll, findAllPublished, deleteAll, updateOne } = require('./controllers/tutorial.controller')
const { signin, signup } = require('./controllers/auth.controller')
const { verifyToken, isAdmin, isModeratorOrAdmin, isModerator, checkRolesExisted, checkDuplicateUser } = require('./middlewares')
const db = require('./models')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))

const PORT = process.env.PORT || 8080

app.post('/api/auth/signup', [checkDuplicateUser, checkRolesExisted], signup)

app.post('/api/auth/signin', signin)

app.post('/api/tutorials', [verifyToken, isModeratorOrAdmin], create)

app.get('/api/tutorials/:id', [verifyToken, isModerator], find)

app.get('/api/tutorials', [verifyToken, isModerator], findAll)

app.get('/api/tutorials/published', [verifyToken], findAllPublished)

app.put('/api/tutorials/:id', [verifyToken, isModeratorOrAdmin], updateOne)

app.delete('/api/tutorials', [verifyToken, isAdmin], deleteAll)

app.delete('/api/tutorials/:id', [verifyToken, isAdmin], deleteAll)

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`)
  await db.sequelize.sync()
})

module.exports = app
