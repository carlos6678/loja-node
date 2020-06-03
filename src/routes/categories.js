const router = require('express').Router()
const CategoryController = require('../controllers/category')

router.get('/categoria/:id',CategoryController.category_product)

module.exports = router