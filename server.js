//CONFIG
const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const breadRoutes = require('./controllers/breads_controller')

const app = express()

//MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//MIDDLEWARE PART DEUX
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

//ROUTES
app.use('/breads', breadRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to BREAD!")
})

app.listen(PORT, () => console.log(`Live and worldwide at port ${PORT}`))