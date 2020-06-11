const router = require('express').Router()
const ProductController = require('../controllers/product')
const is_logged = require('../middlewares/is_logged')

router.get('/product/:id',ProductController.Product)
router.post('/comment/:id',is_logged,ProductController.CommentProduct)

module.exports = router