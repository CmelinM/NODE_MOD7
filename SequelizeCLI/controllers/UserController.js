'use strict'
const db = require('../models')
const { User } = db

const UserController = {}

UserController.create = async (req, res, next) => {
  const data = req.body

  try {
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

module.exports = {
  UserController
}
