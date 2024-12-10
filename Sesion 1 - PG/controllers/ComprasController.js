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
  const { error, value: compra } = buyIdSchema.validate()

  if(error) {
    return res.status(400).json(error)
  }

  try {
    await Compra.buyAnime(user_id, data.anime_id)
    
    return res.json({ message: 'Compra exitosa' })
  } catch (err) {
    console.log(err)
    if(err.code = '23503') {
      return res.status(404).json({ message: 'Recurso no encontrado' })
    }
    res.status(500).json({ message: 'Internal Server Error' })
  }
}