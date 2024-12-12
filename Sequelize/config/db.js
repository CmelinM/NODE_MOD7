/**
 * CommonJS
 */

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT
});

/**
 * Los modelos extienden a Model
 */
class User extends Model {}

User.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Usuarios',
    timestamps: false
  }
)

class Anime extends Model {}

Anime.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { min: 0 }
    }
  },
  {
    modelName: 'Anime',
    sequelize,
    indexes: [
      { unique: true, fields: [ 'autor', 'nombre' ] }
    ]
  }
)


async function connectTesting() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectTesting().then(console.log)

module.exports = {
  sequelize,
  User,
  Anime
}