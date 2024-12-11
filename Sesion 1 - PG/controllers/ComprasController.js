import { buyIdSchema } from "../dto/index.js"
import { Compra } from "../models/index.js"

/**
 * POST /usuarios/:user_id/animes
 * 
 * {
 *    anime_id: 4
 * }
 */
export const UserBuyAnime = async (req, res, next) => {
  const { user_id } = req.params
  const data = req.body

  if(isNaN(Number(user_id)) || Number(user_id) < 0) {
    return res.status(400).json({ message: 'id usuario inválido' })
  }

  // TODO: revisar el contenido de value
  const { error, value: compra } = buyIdSchema.validate(data)
  // console.log("Value", value)
  console.log("Compra", compra)
  console.log("error", error)

  if(error) {
    return res.status(400).json(error)
  }

  try {
    console.log("user_id", user_id)
    await Compra.buyAnime(user_id, compra.anime_id)
    
    return res.json({ message: 'Compra exitosa' })
  } catch (err) {
    // if(err.code == 'ANIME_NOT_FOUND') {
    //   return res.status(404).json({ error: err.message })
    // }
    if(err.code == '23503' && err.detail.includes("user_id")) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    if(err.code == '23503' && err.detail.includes("anime_id")) {
      return res.status(404).json({ error: 'Anime no encontrado' })
    }

    if(err.code == '23514') {
      return res.status(409).json({ error: 'Anime sin stock suficiente para compra' })
    }
    res.status(500).json({ message: 'Internal Server Error' })
  }
}