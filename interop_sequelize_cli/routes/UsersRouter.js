import express from 'express'
import { UsersController } from '../controller/index.js'

const router = express.Router()

router.post("/", UsersController.create)

export { router as UsersRouter }