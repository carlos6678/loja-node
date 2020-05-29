module.exports = function(req,res,next){
    if(req.session.logado){
        next()
    }else{
        res.redirect('/login/logar')
    }
}