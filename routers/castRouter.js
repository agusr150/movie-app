const express = require('express')
const router = express.Router()

const Cast = require('../controllers/castControl') 

router.get('/', Cast.show)
router.get('/add', Cast.addForm)
router.post('/add', Cast.add)
router.get('/edit/:id', Cast.editForm)
router.post('/edit/:id', Cast.edit)
router.get('/delete/:id', Cast.delete)
router.get('/movies/:id', Cast.seeMoviesForm)

module.exports = router