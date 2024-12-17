const express = require('express')
const { UserRouter } = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use("/usuarios", UserRouter)

app.listen(PORT, console.log(`App en el puerto ${PORT}`))
