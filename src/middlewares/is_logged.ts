import {Request,Response,NextFunction} from 'express'

export default function(req:Request,res:Response,next:NextFunction):void{
    if(req.session.logado){
        next()
    }else{
        res.redirect('/login/logar')
    }
}