const db = require('../models')
const { Op } = db.Sequelize
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
        return res.send(error).status(500)
    }
}

const findAll = async (req, res) => {
    try {
        const { title } = req.query
        const whereCondition = title ? { title: { [Op.like]: `%${title}%` } } : null
        const allTutorials = await db.Tutorial.findAll({where: whereCondition })
        return res.json(allTutorials)
    } catch (error) {
        return res.send(error).status(500)
    }
}

const findAllPublished = async (req, res) => {
    try {
        const allPublishedTutorials = await db.Tutorial.findAll({where: { published: true } })
        return res.json(allPublishedTutorials)
    } catch (error) {
        return res.send(error).status(500)
    }
}

module.exports = { create, findAll, findAllPublished }