const { User, ToDo } = require('../config')

const UsersController = {}

UsersController.create = async (req, res, next) => {
  const data = req.body

  try {
    const user = await User.create(data)

    return res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

UsersController.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [ [ 'id', 'ASC'] ] })

    console.log(users.map(user => user.getSafeInfo()))

    return res.json(users.map(user => user.getSafeInfo()))
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

// /usuarios/:id
UsersController.findById = async (req, res, next) => {
  const { id } = req.params

  try {
    const usuario = await User.findByPk(id)

    /**
     * usuario es instancia de User
     * trae métodos "ayudantes" que permiten traer
     * información de tablas relacionadas
     */
    // console.log(usuario)

    /**
     * usuario.toJSON() es info "plana"
     */
    // console.log(usuario.toJSON())

    /**
     * usuario.getSafeInfo()
     * 
     * metodo creado, definimos campos, transformaciones
     * o modificaciones para presentar data
     */
    // console.log(usuario.getSafeInfo())

    if(!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.json(usuario)
  } catch (err) {
    console.error(err)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

UsersController.delete = async (req, res, next) => {
  const { id } = req.params

  try {
    await User.destroy({ where: { id } })
    return res.json({ message: 'Usuario eliminado' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

UsersController.update = async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  try {
    const user = await User.update(data, { where: { id } })

    if(user[0] == 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    return res.json({ message: 'Usuario actualizado' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

// POST /usuarios/:id/tarea + payload
UsersController.createTodo = async (req, res, next) => {
  const { id } = req.params
  const data = req.body
  data.userId = id

  try {
    const user = await User.findByPk(id)

    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const todo = await ToDo.create(data)

    return res.json({ user, todo })
  } catch (err) {
    // TODO: definir status codes
    return res.json({ message: err.message })
  }
}

UsersController.listTodo = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findOne({
      where: { id },
      include: ToDo
    })

    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.json(user.getSafeInfo())
  } catch (err) {
    console.error(err)

    return res.json({ message: 'Problemas obteniendo usuario' })
  }
}

UsersController.getTodoById = async (req, res, next) => {
  const { user_id, tarea_id } = req.params

  try {
    const tarea = await ToDo.findOne({
      where: { userId: user_id, id: tarea_id },
      include: User
    })

    console.log(await tarea.getUser())

    return res.json(tarea)
  } catch (err) {

    res.json(err)
  }
}

module.exports = {
  UsersController
}