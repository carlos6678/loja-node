import {check} from 'express-validator'

export default[
    check('email')
    .not().isEmpty().withMessage('Campo E-mail vazio')
    .isEmail()
    .normalizeEmail(),

    check('password')
    .not().isEmpty().withMessage('Campo Senha vazio')
    .isAlphanumeric()
]
