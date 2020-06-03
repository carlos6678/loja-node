const router = require('express').Router()
const CartController = require('../controllers/cart')
const is_logged = require('../middlewares/is_logged')

router.get('/mycart',is_logged,CartController.homeCart)
router.post('/add',is_logged,CartController.add)

module.exports = router