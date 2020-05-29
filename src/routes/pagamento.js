const router = require('express').Router()
const is_logged = require('../middlewares/is_logged')

router.get('/pagar',is_logged,(req,res)=>{
    res.send('Logado')
})

module.exports = router