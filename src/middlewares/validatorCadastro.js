const {check} = require('express-validator')
module.exports = [
    check('name')
    .not().isEmpty().withMessage('Campo Nome está vazio')
    .isAlphanumeric(),

    check('tel')
    .not().isEmpty().withMessage('Campo de Telefone vazio')
    .trim(),

    check('sexo')
    .not().isEmpty().withMessage('Campo de sexo não marcado')
    .isAlpha()
    .trim(),

    check('email')
    .not().isEmpty().withMessage('Campo de E-mail vazio')
    .isEmail()
    .normalizeEmail(),

    check('password')
    .not().isEmpty().withMessage('Campo de Senha vazio')
    .isAlphanumeric()
]