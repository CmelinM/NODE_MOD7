/**
 * Importamos "Conector a DB"
 */
import { query } from "../config/index.js";

const User = {}

User.getAll = async () => {
  let text = 'SELECT id, nombre, apellido, email FROM usuarios'
  let params = []

  const results = await query(text, params)
  return results
}

User.create = async (data) => {
  let text = 'INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING id, nombre, apellido, email'
  let params = [data.nombre, data.apellido, data.email, data.password]

  const result = await query(text, params)
  return result
}

User.find = async (id, email) => {
  if(id) {
    let text = 'SELECT id, nombre, apellido, email FROM usuarios WHERE id = $1'
    let params = [id]
    const result = await query(text, params)
    return result
  } else {
    let text = 'SELECT id, nombre, apellido, email FROM usuarios WHERE email = $1'
    let params = [email]
    const result = await query(text, params)
    return result
  }
}

User.update = async (id, data) => {
  let campos = []
  let params = []
  let index = 1

  /**
   * text = 'UPDATE usuarios SET nombre=$1, apellido=$2 WHERE id = $3';
   * params = [ 'tulio', 'triviño' ]
   * 
   * data = { nombre: 'Tulio', apellido: 'Triviño' }
   */
  for (let key in data) {
    campos.push(`${key} = $${index}`)
    params.push(data[key])
    index++
  }
  params.push(id)

  if(campos.length == 0) {
    throw new Error('No hay datos para actualizar')
  }

  let text = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = $${index}`

  const result = await query(text, params)
  return result.rows
}

export { User }
