const express = require('express')
const router = express.Router()

const Movie = require('../controllers/movieControl') 

router.get('/', Movie.show)
router.get('/add', Movie.addForm)
router.post('/add', Movie.add)
router.get('/edit/:id', Movie.editForm)
router.post('/edit/:id', Movie.edit)
router.get('/delete/:id', Movie.delete)
router.get('/addCast/:id', Movie.addCastForm)
router.post('/addCast/:id', Movie.addCast)


module.exports = router