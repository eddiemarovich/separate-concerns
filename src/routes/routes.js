const express = require('express')
const router = express.Router()
const control = require('../controllers/controls')

router.get('/', control.getAll);

router.get('/:id', control.getById);

router.post('/', control.makeNewShoe);

router.put('/:id', control.updateShoe);

router.delete('/:id', control.deleteShoe);

module.exports = router
