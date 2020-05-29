require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(session({secret:'cat',cookie:{secure:false},saveUninitialized:true,resave:false}))
app.use(function(req, res, next) {
    res.locals.user = req.session.logado;
    next();
  });
//Rotas
app.use('/',require('./routes/home'))
app.use('/products',require('./routes/products'))
app.use('/login',require('./routes/login'))
app.use('/pagamento',require('./routes/pagamento'))
//pasta estatica
app.use(express.static(__dirname+'/public'))
//configuração das views
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'public/views'))

module.exports = app