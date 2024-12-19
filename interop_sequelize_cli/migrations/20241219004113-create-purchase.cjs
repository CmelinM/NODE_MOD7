'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de tabla
          key: 'id' // Campo en tabla objetivo
        }
      },
      AnimeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Animes',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.REAL,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Purchases');
  }
};