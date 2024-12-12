const express = require('express')
const bodyParser = require('body-parser')
const { UserRouters } = require('./routers')

const app = express()

app.use(bodyParser.json())

app.use("/usuarios", UserRouters)

app.listen(3000, console.log("App en puerto 3000"))