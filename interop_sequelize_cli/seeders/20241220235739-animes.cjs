'use strict';

const data = require('./animeData.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const animes = data.animes.map(anime => ({ 
      ...anime, 
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('Animes', animes)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Animes', null, {})
  }
};
