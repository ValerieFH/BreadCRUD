//CONFIG
const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const breadRoutes = require('./controllers/breads_controller')
const methodOverrid = require('method-override')
const mongoose = require('mongoose')

const app = express()

//MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverrid('_method'))

//ROUTES
app.use('/breads', breadRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to BREAD!")
})

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB is locked and loaded'))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Live and worldwide at port ${PORT}`))