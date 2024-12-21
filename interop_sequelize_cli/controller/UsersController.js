import * as db from '../models/index.cjs'

const { User } = db.default

const UsersController = {}

UsersController.create = async (req, res, next) => {
  const data = req.body

  try {
    const user = await User.create(data)

    return res.json(user)
  } catch (err) {
    console.error(err)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

UsersController.list = async (req, res, next) => {
  const users = await User.findAll()

  return res.json(users)
}

UsersController.delete = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await User.destroy({ where: { id } })

    if(!result) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({ message: 'Usuario eliminado' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export { UsersController }
