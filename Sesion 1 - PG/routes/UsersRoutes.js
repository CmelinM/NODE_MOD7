import express from 'express'
import { CreateUser, DeleteUser, FindUser, GetUsers, UpdateUser } from '../controllers/index.js'

/**
 * Definimos instancia de enrutador
 */

const router = express.Router()

router.get("/", async (req, res, next) => {
  await GetUsers(req, res, next)
})

router.get("/:id", FindUser)
router.post("/", CreateUser)
router.patch("/:id", UpdateUser)
router.delete("/:id", DeleteUser)

export { router as UsersRouter }
