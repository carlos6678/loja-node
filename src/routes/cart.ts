import express from 'express'
import CartController from '../controllers/cart'
import is_logged from '../middlewares/is_logged'

const Router = express.Router()

Router.get('/mycart',is_logged,CartController.homeCart)
Router.post('/add',is_logged,CartController.add)
Router.get('/delete/:id',is_logged,CartController.delete)
Router.get('/subtraction/:id',is_logged,CartController.subtraction)
Router.get('/addUnidade/:id',is_logged,CartController.addUnidade)
Router.post('/calcFrete',CartController.calcFrete)

export default Router 