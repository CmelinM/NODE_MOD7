/**
 * Importamos el "Conector a BD"
 */
import { query } from "../config/index.js"

const Anime = {}

Anime.getAll = async () => {
  let text = 'SELECT id, nombre, genero, year, autor, stock FROM animes ORDER BY id'
  let params = []
  const result = await query(text, params)
  return result
}

Anime.create = async (data) => {
  let text = 'INSERT INTO animes (nombre, genero, year, autor, stock) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, genero, year, autor'
  let params = [data.nombre, data.genero, data.year, data.autor, data.stock]
  const result = await query(text, params)
  return result
}

Anime.find = async (id, nombre) => {
  if (id) {
    let text = 'SELECT id, nombre, genero, year, autor, stock FROM animes WHERE id = $1'
    let params = [id]
    const result = await query(text, params)
    return result
  } else {
    let text = 'SELECT id, nombre, genero, year, autor, stock FROM animes WHERE nombre = $1'
    let params = [nombre]
    const result = await query(text, params)
    return result
  }
}

Anime.update = async (id, data) => {
  let campos = []
  let params = []
  let index = 1

  for (let key in data) {
    campos.push(`${key} = $${index}`)
    params.push(data[key])
    index++
  }
  params.push(id)

  if (campos.length == 0) {
    throw new Error('No hay datos para actualizar')
  }

  let text = `UPDATE animes SET ${campos.join(', ')} WHERE id = $${index}`

  const result = await query(text, params)
  return result.rows
}

Anime.delete = async (id) => {
  const text = 'DELETE FROM animes WHERE id = $1'
  const params = [id]
  const result = await query(text, params)
  return result
}

export { Anime }