'use strict'
const db = require('../models')
const { User, ToDo } = db

const UserController = {}

UserController.create = async (req, res, next) => {
  const data = req.body

  try {
    const userExists = await User.findOne({ where: { email: data.email } })

    if(userExists) {
      return res.status(409).json({ message: 'Usuario con correo ya existente' })
    }

    const user = await User.create(data)


    return res.json(user)
  } catch (err) {
    console.log(err)
    // TODO: definir status de error en base a mensaje del error
    if(err?.name.includes('ValidationError')) {
      const { errors } = err
      // path -> atributo o campo
      // message -> mensaje de problema en validación
      const errorMessages = errors.map(({ path, message }) => ( { [path]: message } ))

      return res.status(400).json(errorMessages)
    }
    return res.json(err)
  }
}

UserController.all = async (req, res, next) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    // TODO: borrar console error
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// obtener usuario por ID

// Actualizar usuario
// borrar usuario

/**
 * Todo le pertenece a usuario
 */

// POST /usuarios/:id/todos
UserController.createToDo = async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  try {
    const user = await User.findOne({where: { id }})

    if(!user) {
      return res.status(404).json({ message: 'Usuario no existe' })
    }

    /**
     * data = { title: 'Titulo', description: 'Descripcion' }
     * objeto = { UserId: 1 }
     * 
     * { ...data, ...objeto } = 
     * { title: 'Titulo', description: 'Descripcion', UserId: 1 }
     */

    const todo = await ToDo.create({ ...data, UserId: id })

    return res.status(201).json(todo)
  } catch (err) {
    console.error(err)
    if(err?.name.includes('ValidationError')) {
      const { errors } = err
      const errorMessages = errors.map(({path, message}) => ({ [path]: message }))

      return res.status(400).json(errorMessages)
    }
    res.status(500).json({ message: 'Internal Server Error' })

  }
}

// GET /usuarios/:id/todos
UserController.listTodos = async (req, res, next) => {
  const { id } = req.params

  try {
    const todos = await ToDo.findAll({
      where: {
        UserId: id
      },
      attributes: {
        exclude: ["UserId"]
      },
      include: [
        {
          model: User
        }
      ]
    })

    return res.json(todos)
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
// listar tarea del usuario por ID
// Actualizar tarea del usuario
// borrar tarea

module.exports = {
  UserController
}
