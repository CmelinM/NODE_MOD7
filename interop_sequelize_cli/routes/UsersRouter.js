import express from 'express'
import { UsersController } from '../controller/index.js'

const router = express.Router()

router.post("/", UsersController.create)
router.get("/", UsersController.list)

export { router as UsersRouter }