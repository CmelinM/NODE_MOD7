import express from 'express'
import { User } from '../models/index.js'

/**
 * Definimos instancia de enrutador
 */
const router = express.Router()

router.get("/", async (req, res) => {
  try {
  /**
   * Tratamos de leer a los usuarios desde la base de datos
   */
    let UsersRows = await User.getAll()

    res.json(UsersRows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



export { router as UsersRouter }
