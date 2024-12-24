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

    // Compra de anime
    static async createOrder(data) {
      const transaction = await sequelize.transaction()
      try {
        const purchase = await this.create(data, { transaction })

        const user = await purchase.getUser({ transaction })
        const anime = await purchase.getAnime({ transaction })

        // console.log(user)
        // console.log(anime)

        if(!user) throw new Error('User not found', { cause: 'INVALID_RECORD' });
        if(!anime) throw new Error('Anime not found', { cause: 'INVALID_RECORD' });

        anime.stock -= 1;
        await anime.save({ transaction })

        await transaction.commit()
        return purchase
      } catch (err) {
        await transaction.rollback()
        throw err
      }
    }

    static async returnOrderById(id) {
      const transaction = await sequelize.transaction();

      try {
        const purchase = await this.findByPk(id, { transaction })

        if(!purchase){
          throw new Error('Compra no encontrada', { cause: 'RECORD_NOT_FOUND' })
        }

        const anime = await purchase.getAnime({ transaction })
        anime.stock += 1;

        await anime.save({ transaction })
        await purchase.destroy({ transaction })

        await transaction.commit()
      } catch (err) {
        await transaction.rollback()
        throw err
      }
    }

    async returnOrder() {

    }

    static associate(models) {
      // define association here
      const { User, Anime } = models
      this.belongsTo(User)
      this.belongsTo(Anime)
    }
  }
  Purchase.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AnimeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Purchase',
    paranoid: true
  });
  return Purchase;
}; 