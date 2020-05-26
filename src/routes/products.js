const router = require('express').Router()
const ProductController = require('../controllers/product')

router.get('/product/:id',ProductController.Product)

module.exports = router