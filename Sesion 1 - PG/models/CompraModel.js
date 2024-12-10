import { query, getClient } from "../config/index.js"

const Compra = {}

Compra.buyAnime = async (user_id, anime_id) => {
  const client = await getClient()

  try {
    await client.query('BEGIN') // INICIANDO TRANSACCION SQL

    const animeQueryText = 'UPDATE animes SET stock = stock - 1 WHERE id = $1'
    const animeParams = [anime_id]

    const resultAnime = await client.query(animeQueryText, animeParams)

    // TODO: generar una clase de error personalizada
    if(resultAnime.rowCount == 0) throw new Error('anime no encontrado');

    const compraQueryText = 'INSERT INTO compras (user_id, anime_id) VALUES ($1, $2)'
    const compraParams = [user_id, anime_id]

    await client.query(compraQueryText, compraParams)

    await client.query('COMMIT') // Confirmamos cambios en la base de datos
  } catch (err) {
    await client.query('ROLLBACK') // deshacemos posibles cambios
    throw err // lanzamos error para manejo en controlador
  } finally {
    client.release() // Liberamos al "agente" para que acepte nuevas on
  }
}

export { Compra }