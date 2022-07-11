const db = require('../models')

const { User } = db

const ROLES = ['user', 'admin', 'moderator']

const checkDuplicateUser = async (req, res, next) => {
  try {
    const { username, email } = req.body
    if (!username && !email) return res.status(400).send('ERR_NO_PARAMETER_PROVIDED')

    const whereBuilder = {}
    if (username) whereBuilder.username = username
    if (email) whereBuilder.email = email
    const user = await User.findOne({ where: whereBuilder })
    if (user) return res.status(400).send('ERR_USER_ALREADY_EXISTS')
    next()
  } catch (error) {
    console.log({ error })
    return res.status(500).send(error)
  }
}

const checkRolesExisted = (req, res, next) => {
  try {
    const { roles } = req.body
    if (!roles || !roles.length) return next()
    for (let i = 0; i < roles.length; i++) {
      const currentRole = roles[i]
      if (!ROLES.includes(currentRole)) return res.status(400).send('ERR_ROLE_DOES_NOT_EXIST')
    }
    next()
  } catch (error) {
    console.log({ error })
    return res.status(500).send(error)
  }
}

module.exports = { checkDuplicateUser, checkRolesExisted }
