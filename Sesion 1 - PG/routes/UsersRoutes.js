import express from 'express'
import { CreateUser, FindUser, GetUsers, UpdateUser } from '../controllers/index.js'

/**
 * Definimos instancia de enrutador
 */
const router = express.Router()

router.get("/", GetUsers)
router.get("/:id", FindUser)
router.post("/", CreateUser)
router.put("/:id", UpdateUser)

export { router as UsersRouter }
