/**
 * Configuraciones de conexión a la DB
 */

import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  user: process.env.PG_USER
})

export const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })
  return res
}