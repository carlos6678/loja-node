const UsersModel = require('../models/users')
const {validationResult} = require('express-validator')
module.exports = {
    async logar(req,res){
        res.render('login')
    },
    async cadastrar(req,res){
        res.render('cadastrar')
    },
    async verificar(req,res){
        let errors = validationResult(req).array()
        let session=null

        if(errors.length>0){
            res.render('login',{errors})
        }
        session=await UsersModel.AccountExists(req.body)
        if(session.length>0){
            req.session.logado=session
            res.locals.user=req.session.logado
            res.redirect('/')
        }else{
            errors.push({msg:'Conta nâo existe'})
            res.render('login',{errors})
        }
    },
    async salvar(req,res){
        let errors = validationResult(req).array()

        if(errors.length>0){
            res.render('cadastrar',{errors})
        }
        if((await UsersModel.EmailExists(req.body)).length>0){
            errors.push({msg:'E-mail já Cadastrado'})
            res.render('cadastrar',{errors})
        }

        await UsersModel.saveCredentials(req.body)
        res.redirect('/login/logar')
    },
    logout(req,res){
        req.session.cart=undefined
        req.session.logado=undefined
        res.redirect('/')   
    }
}