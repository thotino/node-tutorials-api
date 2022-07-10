const db = require('../models')
const { Op } = db.Sequelize

const create = async (req, res) => {
  const transaction = await db.sequelize.transaction()
  try {
    console.log(req.body)
    const { title, description, published = false } = req.body
    const createdTutorial = await db.Tutorial.create({ title, description, published }, { transaction })
    await transaction.commit()
    return res.json(createdTutorial)
  } catch (error) {
    await transaction.rollback()
    return res.send(error).status(500)
  }
}

const find = async (req, res) => {
  try {
    const { id } = req.params
    const tutorial = await db.Tutorial.findByPk(id)
    return res.json(tutorial)
  } catch (error) {
    return res.send(error).status(500)
  }
}

const findAll = async (req, res) => {
  try {
    const { title } = req.query
    const whereCondition = title ? { title: { [Op.like]: `%${title}%` } } : null
    console.log({ whereCondition })
    const allTutorials = await db.Tutorial.findAll({ where: whereCondition })
    return res.json(allTutorials)
  } catch (error) {
    return res.send(error).status(500)
  }
}

const findAllPublished = async (req, res) => {
  try {
    const allPublishedTutorials = await db.Tutorial.findAll({ where: { published: true } })
    return res.json(allPublishedTutorials)
  } catch (error) {
    return res.send(error).status(500)
  }
}

const updateOne = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, published } = req.body
    const entity = await db.Tutorial.findByPk(id)
    if (!entity) return res.status(404).send('ERR_TUTORIAL_NOT_FOUND')
    const updated = await entity.update({ title, description, published })
    return res.json(updated)
  } catch (error) {
    return res.send(error).status(500)
  }
}

const deleteAll = async (req, res) => {
  const transaction = await db.sequelize.transaction()
  try {
    const { id } = req.params
    const whereCondition = id ? { id } : {}
    const numberOfDeletedInstances = await db.Tutorial.destroy({ where: whereCondition, transaction })
    await transaction.commit()
    return res.send(`${numberOfDeletedInstances} tutorials deleted`)
  } catch (error) {
    await transaction.rollback()
    return res.send(error).status(500)
  }
}

module.exports = { create, find, findAll, findAllPublished, updateOne, deleteAll }
