const db = require('../models')

const create = async (req, res) => {
    const transaction = await db.sequelize.transaction()
    try {
        console.log(req.body)
        const { title, description, published = false } = req.body
        const createdTutorial = await db.Tutorial.create({ title, description, published }, { transaction })
        await transaction.commit()
        return res.send(createdTutorial) 
    } catch (error) {
        await transaction.rollback()
        return res.send(error)
    }
}

module.exports = { create }