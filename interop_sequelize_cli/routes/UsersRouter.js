import express from 'express'
import { UsersController } from '../controller/index.js'

const router = express.Router()

router.post("/", UsersController.create)
router.get("/", UsersController.list)
router.delete("/:id", UsersController.delete)

export { router as UsersRouter }