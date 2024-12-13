/**
 * Librerías
 */
const express = require('express')
const bodyParser = require('body-parser')

/**
 * Importaciones locales
 */
const { UserRouters } = require('./routers')

const app = express()

app.use(bodyParser.json())
app.use("/usuarios", UserRouters)

app.listen(3000, console.log(`App escuchando el puerto 3000`))

