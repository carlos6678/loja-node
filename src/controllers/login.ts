import { Request,Response } from 'express'
import UsersModel from '../models/users'
import {validationResult} from 'express-validator'

class LoginController{
    public async logar(req:Request,res:Response):Promise<void>{
        res.render('login')
    }
    async cadastrar(req:Request,res:Response):Promise<void>{
        res.render('cadastrar')
    }
    async verificar(req:Request,res:Response):Promise<void>{
        let errors:Array<object> = validationResult(req).array()
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
    }
    async salvar(req:Request,res:Response):Promise<void>{
        let errors:Array<object> = validationResult(req).array()

        if(errors.length>0){
            res.render('cadastrar',{errors})
        }
        if((await UsersModel.EmailExists(req.body)).length>0){
            errors.push({msg:'E-mail já Cadastrado'})
            res.render('cadastrar',{errors})
        }

        await UsersModel.saveCredentials(req.body)
        res.redirect('/login/logar')
    }
    logout(req:Request,res:Response):void{
        req.session.cart=undefined
        req.session.logado=undefined
        res.redirect('/')   
    }
}

export default new LoginController()