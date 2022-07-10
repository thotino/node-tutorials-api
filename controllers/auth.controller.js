const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { Sequelize: { Op }, User, Role } = require('../models')
const { privateKey } = require('../certificates')

const signup = async (req, res) => {
    try {
        const { username, email, password, roles: reqRoles } = req.body
        if (!username || !email || !password) return res.status(400).send('ERR_NO_VALID_PARAMETERS_PROVIDED')
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password, salt)
        const createdUser = await User.create({ username, email, password: hashedPassword })

        if (reqRoles && reqRoles.length) {
            const roles = await Role.findAll({ where: { name: { [Op.or]: reqRoles } } })
            await createdUser.setRoles(roles)
            return res.json(createdUser)
        } else {
            await createdUser.setRoles([1])
            return res.json(createdUser)
        }
    } catch (error) {
        console.log({ error })
        return res.status(500).send(error)
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) return res.status(400).send('ERR_NO_VALID_PARAMETERS_PROVIDED')
        const user = await User.findOne({ where: { username } })
        if (!user) return res.status(404).send('ERR_USER_NOT_FOUND')

        const isPasswordValid = bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).send('ERR_INVALID_PASSWORD')

        const token = jwt.sign({ id: user.id, username: user.username }, privateKey, { expiresIn: 86400 })
        
        const allUserRoles = await user.getRoles()
        const authorities = allUserRoles.map(({ name }) => (`ROLE_${name.toUpperCase()}`))
        
        return res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })

    } catch (error) {
        console.log({ error })
        return res.status(500).send(error)
    }
}

module.exports = { signup, signin }