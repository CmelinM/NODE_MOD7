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

export { UsersController }
