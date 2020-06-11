const router = require('express').Router()
const validatorLogin = require('../middlewares/validatorLogin')
const validatorCadastro = require('../middlewares/validatorCadastro')
const loginController =  require('../controllers/login')
const passport = require('passport')
const Strategy = require('passport-facebook')
const knex = require('../services/database')

//Autenticação com facebook
passport.use(new Strategy({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:process.env.CALLBACKURL,
    profileFields:['id','displayName','email']
    },
    async function(accessToken,refreshToken,user,cb){
        const verify = await knex('users').select().where({social_id:user.id})
        if(verify.length>0){
            return cb(null, user);
        }else{
            knex('users')
            .insert({
                social_id:user.id,
                name:user.displayName,
                email:user.emails[0].value,
                password:user.id
            }).then((result)=>{
                return cb(null,user)
            }).catch((err)=>{
                console.log(err)
                return cb(err,user)
            })
        }
}))
  
passport.serializeUser(function(user, cb) {
    cb(null,user)
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

router.use(passport.initialize())
router.use(passport.session())

router.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}))
router.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect: '/login'}),async (req,res)=>{
    const {id} = req.user
    req.session.logado = await knex('users').select('id','name','email').where('social_id',id)
    console.log(req.session.logado)
    res.redirect('/')
})

router.get('/logar',loginController.logar)
router.post('/logar',validatorLogin,loginController.verificar)

router.get('/cadastrar',loginController.cadastrar)
router.post('/salvar',validatorCadastro,loginController.salvar)

router.get('/logout',loginController.logout)

module.exports = router