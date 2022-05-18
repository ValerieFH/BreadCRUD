const express = require('express')
const router = express.Router()
const Bread = require('../models/bread')

router.get('/', (req, res) => {
    res.render('index', {
        breads: Bread,
        title: 'Behold, all da Breads'
    })
})

router.get('/:arrayIndex', (req, res) => {
    const {  arrayIndex  } = req.params
    res.render('show', {
        bread: Bread[arrayIndex]
    })
})

module.exports = router