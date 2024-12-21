'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Purchase } = models
      this.hasMany(Purchase)
    }
  }
  Anime.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        isValidYear(data) {
          const currentYear = (new Date()).getFullYear()

          if(data > currentYear) {
            throw new Error('El año no puede ser "futuro"')
          }
        }
      }
    },
    stock: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Anime',
    paranoid: true
  });
  return Anime;
};