import express from 'express' 
import validatorLogin from '../middlewares/validatorLogin'
import validatorCadastro from '../middlewares/validatorCadastro'
import loginController from '../controllers/login'
import passport from 'passport'
import Strategy from 'passport-facebook'
import knex from '../services/database'

const Router = express.Router()
//Autenticação com facebook
passport.use(new Strategy({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:process.env.CALLBACKURL,
    profileFields:['id','displayName','email']
    },
    async function(accessToken:string,refreshToken:string,user:any,cb:any):Promise<any>{
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
  
passport.serializeUser(function(user:object, cb:any) {
    cb(null,user)
});

passport.deserializeUser(function(obj:object, cb:any) {
    cb(null, obj);
});

Router.use(passport.initialize())
Router.use(passport.session())

Router.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}))
Router.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect: '/login'}),async (req,res)=>{
    const {id} = <any>req.user
    req.session.logado = await knex('users').select('id','name','email').where('social_id',id)
    res.redirect('/')
})

Router.get('/logar',loginController.logar)
Router.post('/logar',validatorLogin,loginController.verificar)

Router.get('/cadastrar',loginController.cadastrar)
Router.post('/salvar',validatorCadastro,loginController.salvar)

Router.get('/logout',loginController.logout)

export default Router