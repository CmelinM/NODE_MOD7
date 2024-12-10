import express from 'express'
import bodyParser from 'body-parser'

import { AnimesRouter, ComprasRouter, UsersRouter } from './routes/index.js'

const PORT = process.env.PORT || 3000
const app = express()

/**
 * Middlewares
 */
app.use(bodyParser.json()) // permitir analizar json en el cuerpo de req

/**
 * Rutas
 */
app.use("/usuarios", async (req, res, next) => { 
  await UsersRouter(req, res, next)
})
app.use("/animes", AnimesRouter)
app.use("/compras", ComprasRouter)

/**
 * Levantamos Servidor
 */
app.listen(PORT, () => {
  console.log(`Aplicación corriendo en el puerto ${PORT}`)
})

/**
 * Resiliencia
 */
process.on('uncaughtException', (err) => {
  console.log(err)
})
