const jwt = require('jsonwebtoken')
const { publicKey } = require('../certificates')
const { User } = require('../models')

const verifyToken = (req, res, next) => {
  try {
    const { 'x-access-token': token } = req.headers
    if (!token) return res.status(403).send('ERR_NO_TOKEN_PROVIDED')
    const payload = jwt.verify(token, publicKey)
    req.userId = payload.id
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) return res.status(401).send('ERR_UNAUTHORIZED')
    return res.status(500).send(error)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const { userId } = req
    const user = await User.findByPk(userId)
    const roles = await user.getRoles()
    if (!roles || !roles.length) throw new Error('ERR_USER_WITH_NO_ROLE')
    const adminRole = roles.find(({ name }) => (name === 'admin'))
    if (!adminRole) return res.status(403).send('ERR_ADMIN_ROLE_REQUIRED')
    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

const isModerator = async (req, res, next) => {
  try {
    const { userId } = req
    const user = await User.findByPk(userId)
    const roles = await user.getRoles()
    if (!roles || !roles.length) throw new Error('ERR_USER_WITH_NO_ROLE')
    const adminRole = roles.find(({ name }) => (name === 'moderator'))
    if (!adminRole) return res.status(403).send('ERR_MODERATOR_ROLE_REQUIRED')
    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const { userId } = req
    const user = await User.findByPk(userId)
    const roles = await user.getRoles()
    if (!roles || !roles.length) throw new Error('ERR_USER_WITH_NO_ROLE')
    const adminRole = roles.find(({ name }) => (name === 'moderator' || name === 'admin'))
    if (!adminRole) return res.status(403).send('ERR_MODERATOR_OR_ADMIN_ROLE_REQUIRED')
    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = { verifyToken, isAdmin, isModerator, isModeratorOrAdmin }
