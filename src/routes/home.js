const router = require('express').Router()
const HomeController = require('../controllers/home')

router.get('/',HomeController.home)
router.get('/:page',HomeController.home)

module.exports = router