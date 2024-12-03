/**
 * Importamos "Conector a DB"
 */
import { query } from "../config/index.js";

const User = {}

User.getAll = async () => {
  let text = 'SELECT * FROM usuarios'
  let params = []

  const results = await query(text, params)
  return results
}

export { User }
