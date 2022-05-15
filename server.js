const express = require('express')

//CONFIG
require('dotenv').config()
const PORT = process.env.PORT
const breadRoutes = require('./controllers/breads_controller')

const app = express()

app.use('/breads', breadRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to BREAD!")
})

app.listen(PORT, () => console.log(`Live and worldwide at port ${PORT}`))