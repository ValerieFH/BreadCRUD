const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const Bread = require('../models/bread')
const seedData = require('../models/seed')

router.get('/seed', async (req, res) => {
    try {
       await Bread.insertMany(seedData)
       res.redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

//get all bread
router.get('/', async (req, res) => {
    try {
        const bread = await Bread.find()
        res.render('index', {
            breads: bread,
            title: 'Behold, all da Breads'
        })
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

router.get('/new', (req, res) => {
    res.render('new')
})

//get bread by index
router.get('/:id', async (req, res) => {
    try {
        const {  id  } = req.params
        const bread = await Bread.findById(id)
        console.log(bread)
        res.render('show', {
            bread
        })
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

//CREATE
router.post('/', async (req, res) => {
    try {
        if(!req.body.image){
            delete req.body['image']
        }
        if(req.body.hasGluten === 'on'){
            req.body.hasGluten = true
        } else {
            req.body.hasGluten = false
        }
        await Bread.create(req.body)
        res.redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

//UPDATE
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('edit', {
        bread
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)
})

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Bread.findByIdAndDelete(id)
        res.status(303).redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

module.exports = router