/**
 * Importamos dependencias
 */
import express from 'express'
import { UsersRouter } from './routes/index.js'

/**
 * Creamos instancia del servidor "Express"
 */
const app = express()

const port = process.argv[2] || 3000

app.listen(port, () => {
  console.log("Aplicación escuchando el puerto", port)
})

/**
 * Rutas
 */
app.get("/", (req, res) => {
  res.json({ message: 'Hola a todos' })
})

/**
 * Obsoleto
 */
// app.get("/usuarios", (req, res) => {
//   res.json({message: 'Recurso usuarios'})
// })
app.use("/usuarios", UsersRouter)

/**
 * Resiliencia
 */
process.on('uncaughtException', (err) => {
  console.error(err)
})