import express from 'express'
import { UserBuyAnime } from '../controllers/index.js'

const router = express.Router()

router.post("/:user_id/animes", UserBuyAnime)

export { router as ComprasRouter }