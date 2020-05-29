const {check} = require('express-validator')
module.exports = [
    check('email')
    .not().isEmpty().withMessage('Campo E-mail vazio')
    .isEmail()
    .normalizeEmail(),

    check('password')
    .not().isEmpty().withMessage('Campo Senha vazio')
    .isAlphanumeric()
]
