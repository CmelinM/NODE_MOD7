/**
 * Importamos dependencias
 */
import express from 'express'
import bodyParser from 'body-parser'

import { UsersRouter } from './routes/index.js'

/**
 * Creamos instancia del servidor "Express"
 */
const port = process.argv[2] || 3000

const app = express()


app.listen(port, () => {
  console.log("Aplicación escuchando el puerto", port)
})

/**
 * Registramos Enrutadores
 */
app.use("/usuarios", UsersRouter)


/**
 * Rutas
 */
// app.get("/", (req, res) => {
//   res.json({ message: 'Hola a todos' })
// })

/**
 * Obsoleto
 */
// app.get("/usuarios", (req, res) => {
//   res.json({message: 'Recurso usuarios'})
// })

/**
 * Resiliencia
 */
// process.on('uncaughtException', (err) => {
//   console.error(err)
// })