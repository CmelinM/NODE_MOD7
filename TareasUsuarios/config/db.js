const {Sequelize, Model, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT
})

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
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Por favor ingresa un correo válido'
        },
        notEmpty: {
          msg: 'El correo no puede estar vacío'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName: 'User',
    sequelize
  }
)

class ToDo extends Model {

}

ToDo.init(
  {
    titulo:{
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "ToDo"
  }
)

ToDo.belongsTo(User, { foreignKey: 'userId' })

async function connectTesting() {
  try {
    await sequelize.sync();

    /**
     * Creamos Usuario
     */
    // const usuario = await User.create({
    //   nombre: 'Gato',
    //   apellido: 'Alquinta',
    //   correo: 'gato@alquinta.cl',
    //   password: 'colocolo91'
    // })

    // const tarea = await ToDo.create({
    //   titulo: 'Componer nuevo disco',
    //   descripcion: 'Hacer arreglos post produccion',
    //   userId: usuario.id
    // })

    // console.log(usuario)
    // console.log(tarea)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectTesting().then(console.log);

module.exports = {
  User,
  ToDo,
  sequelize
}