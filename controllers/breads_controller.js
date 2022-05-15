const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Breads controller woohoo")
})

module.exports = router