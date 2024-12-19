'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, Anime } = models
      this.belongsTo(User)
      this.belongsTo(Anime)
    }
  }
  Purchase.init({
    UserId: DataTypes.INTEGER, // pendiente las restricciones
    AnimeId: DataTypes.INTEGER, // pendiente restricciones
    amount: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};