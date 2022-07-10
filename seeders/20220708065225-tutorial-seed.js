'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Tutorials', [{
      id: 1,
      title: 'NodeJS',
      description: 'Learn NodeJS - The JavaScript runtime environment.',
      published: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      id: 2,
      title: 'ExpressJS',
      description: 'Learn ExpressJS - The web app framework for NodeJS',
      published: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      id: 3,
      title: 'SequelizeJS',
      description: 'Learn SequelizeJS - The ORM tool for MySQL, SQLite and many more',
      published: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tutorials', { id: { [Sequelize.Op.in]: [1, 2, 3] } })
  }
}
