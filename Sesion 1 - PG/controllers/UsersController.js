import { createUserSchema, updateUserSchema } from "../dto/index.js"
import { User } from "../models/index.js"
import { HashPassword } from "../utils/PasswordUtils.js"

export const GetUsers = async (req, res, next) => {
  try {
  /**
   * Tratamos de leer a los usuarios desde la base de datos
   */
    let UsersRows = await User.getAll()

    return res.json(UsersRows.rows)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const CreateUser = async (req, res, next) => {
  const data = req.body

  const { error, value: user } = createUserSchema.validate(data)

  if(error) {
    return res.status(400).json({ error: error.message })
  }

  try {
    const existingUser = await User.find('', user.email)

    if(existingUser.rowCount > 0) {
      return res.status(409).json({ message: `usuario ya existe` })
    } else {
      /** Hash Password */
      user.password = await HashPassword(user.password)
      const createdUser = await User.create(user)
      return res.status(201).json(createdUser.rows)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/**
 * /usuarios/{id}
 * /usuarios/1
 * /usuarios/asdpo12-qe123-123qwe-123
 */
// TODO: Implementar endpoint
export const FindUser = async (req, res, next) => {
  console.log(req.params)

  return res.json({message: 'Endpoint en progreso'})
}

/**
 * DELETE /usuarios/{id}
 */
export const DeleteUser = async (req, res, next) => {
  return res.json({message: 'Endpoint de borrado en progreso'})
}

/**
 * PUT /usuarios/{id} + payload
 */
export const UpdateUser = async (req, res, next) => {
  const data = req.body

  const { error, value: user } = updateUserSchema.validate(data)

  if(error) {
    return res.status(400).json({ error: error.message })
  } else {
    /**
     * Tratar de actualizar
     */
  }

}