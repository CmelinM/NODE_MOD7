import express from 'express'
import { AnimesRouter, UsersRouter } from './routes/index.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use("/usuarios", UsersRouter)
app.use("/animes", AnimesRouter)

app.listen(PORT, console.log(`App en el puerto ${PORT}`))