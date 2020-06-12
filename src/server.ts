// require('dotenv').config()

// const express = require('express')
// const bodyParser = require('body-parser')
// const path = require('path')
// const session = require('express-session')

// const app = express()

// app.use(bodyParser.urlencoded({extended:false}))
// app.use(session({secret:'cat',rolling:true,cookie:{secure:false},saveUninitialized:true,resave:false}))
// app.use(function(req, res, next){
//   res.locals.user = req.session.logado;
//   res.locals.cart = req.session.cart
//   next();
// });
// //Rotas
// app.use('/',require('./routes/home')) 
// app.use('/products',require('./routes/products'))
// app.use('/login',require('./routes/login'))
// app.use('/pagamento',require('./routes/pagamento'))
// app.use('/categorias',require('./routes/categories'))
// app.use('/cart',require('./routes/cart'))
// //pasta estatica
// app.use(express.static(__dirname+'/public'))
// //configuração das views
// app.set('view engine','ejs')
// app.set('views',path.join(__dirname,'public/views'))

// module.exports = app
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {urlencoded} from 'body-parser'
import path from 'path'
import session from 'express-session'

import home from './routes/home'
import products from './routes/products'
import login from './routes/login'
import categorias from './routes/categories'
import cart from './routes/cart'

class App{
  public app:express.Application;

  public constructor(){
    this.app=express()
    this.middlewares()
    this.Rotas()
  }
  public middlewares():void{
    this.app.use(urlencoded({extended:false}))
    this.app.use(session({secret:'cat',rolling:true,cookie:{secure:false},saveUninitialized:true,resave:false}))
    this.app.use(function(req, res, next){
      res.locals.user = req.session.logado;
      res.locals.cart = req.session.cart
      next();
    });
    this.app.use(express.static(__dirname+'/public'))
    this.app.set('view engine','ejs')
    this.app.set('views',path.join(__dirname,'public/views'))
  }
  public Rotas():void{
    this.app.use('/',home) 
    this.app.use('/products',products)
    this.app.use('/login',login)
    this.app.use('/categorias',categorias)
    this.app.use('/cart',cart)
  }
}

export default new App().app