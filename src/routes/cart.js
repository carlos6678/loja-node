const router = require('express').Router()
const CartController = require('../controllers/cart')
const is_logged = require('../middlewares/is_logged')

router.get('/mycart',is_logged,CartController.homeCart)
router.post('/add',is_logged,CartController.add)
router.get('/delete/:id',is_logged,CartController.delete)
router.get('/subtraction/:id',is_logged,CartController.subtraction)
router.get('/addUnidade/:id',is_logged,CartController.addUnidade)

module.exports = router