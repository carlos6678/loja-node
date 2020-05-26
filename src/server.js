require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
//Rotas
app.use('/',require('./routes/home'))
app.use('/products',require('./routes/products'))
//pasta estatica
app.use(express.static(__dirname+'/public'))
//configuração das views
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'public/views'))

module.exports = app