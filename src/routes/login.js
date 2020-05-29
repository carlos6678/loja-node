const router = require('express').Router()
const validatorLogin = require('../middlewares/validatorLogin')
const validatorCadastro = require('../middlewares/validatorCadastro')
const loginController =  require('../controllers/login')

router.get('/logar',loginController.logar)
router.post('/logar',validatorLogin,loginController.verificar)

router.get('/cadastrar',loginController.cadastrar)
router.post('/salvar',validatorCadastro,loginController.salvar)

module.exports = router