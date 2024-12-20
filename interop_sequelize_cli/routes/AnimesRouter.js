import express from 'express'
import { AnimesController } from '../controller/index.js'

const router = express.Router()

router.post("/", AnimesController.create)
router.get("/", AnimesController.getAllAnimes)

export { router as AnimesRouter }