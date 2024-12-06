import { createUserSchema, updateUserSchema } from "../dto/index.js"
import { User } from "../models/index.js"
import { HashPassword } from "../utils/index.js"

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
export const FindUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.find(id)

    if(user.rowCount == 0) {
      return res.status(404).json({ message: 'Usuario no encontrado'})
    }
    return res.json({ ...user.rows[0] })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

/**
 * DELETE /usuarios/{id}
 */
export const DeleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await User.delete(id)

    if(result.rowCount == 0) {
      return res.status(404).json({message: 'Usuario no encontrado'})
    } else {
      return res.status(200).json({message: 'Usuario eliminado'})
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * PATCH /usuarios/{id} + payload
 */
export const UpdateUser = async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  const { error, value: user } = updateUserSchema.validate({...data, id})

  if(error) {
    return res.status(400).json({ error: error.message })
  }  else {
    /**
     * Tratar de actualizar
     */
    try {
      const existingUser = await User.find(id)

      if(existingUser.rowCount == 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      delete user.id
      await User.update(id, user)

      return res.status(200).json({ message: 'Updated User' })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error'})
    }
  }
}