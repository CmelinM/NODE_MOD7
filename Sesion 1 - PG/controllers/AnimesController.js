import { createAnimeSchema, updateAnimeSchema } from '../dto/index.js'
import { Anime } from '../models/index.js'

/**
 * Funciona
 */
export const GetAnimes = async (req, res, next) => {
  try {
    let AnimesRows = await Anime.getAll()
    return res.json(AnimesRows.rows)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

/**
 * Funciona
 */
export const CreateAnime = async (req, res, next) => {
  const data = req.body

  const { error, value: anime } = createAnimeSchema.validate(data)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  try {
    const existingAnime = await Anime.find('', anime.nombre)
    if (existingAnime.rowCount > 0) {
      return res.status(409).json({ message: `Anime ya existe` })
    } else {
      const createAnime = Anime.create(anime)
      console.log(createAnime)
      //return res.status(201).json(createAnime.rows)
      return res.status(201).json({ message: 'Creado Anime' })
    }
  } catch (err) {
    // console.log(err)
    return res.status(500).json({ message: err.message })
  }

}
/**
 * Funciona ?
 */
export const UpdateAnime = async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  const { error, value: anime } = updateAnimeSchema.validate({ ...data, id })

  if (error) {
    return res.status(400).json({ error: error.message })
  } else {
    /**
     * Tratar de actualizar
     */
    try {
      const existingAnime = await Anime.find(id)

      if (existingAnime.rowCount == 0) {
        return res.status(404).json({ message: 'Anime no encontrado' })
      }
      delete anime.id
      await Anime.update(id, anime)

      return res.status(200).json({ message: 'Updated Anime' })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

/**
 * Funciona
 */
export const FindAnime = async (req, res, next) => {
  const { id } = req.params
  try {
    const anime = await Anime.find(id)

    if (anime.rowCount == 0) {
      return res.status(404).json({ message: 'Anime no encontrado' })
    }

    return res.json({ ...anime.rows[0] })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

/**
 * Funciona
 */
export const DeleteAnime = async (req, res, nex) => {
  const { id } = req.params
  try {
    const result = await Anime.delete(id)
    if (result.rowCount == 0) {
      return res.status(404).json({ message: 'Anime no encontrado' })
    } else {
      return res.status(200).json({ message: 'Anime Elimindado' })
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}