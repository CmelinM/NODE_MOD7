import express from 'express'
import { CreateAnime, GetAnimes, UpdateAnime, DeleteAnime, FindAnime } from '../controllers/index.js'

const router = express.Router()

router.get("/", async (req, res, next) => {
  await GetAnimes(req, res, next)
})

router.get("/:id", FindAnime)
router.post("/", CreateAnime)
router.patch("/:id", UpdateAnime)
router.delete("/:id", DeleteAnime)

export { router as AnimesRouter }