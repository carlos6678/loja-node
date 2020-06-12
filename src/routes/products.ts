import express from 'express'
import ProductController from '../controllers/product'
import is_logged from '../middlewares/is_logged'

const Router = express.Router()

Router.get('/product/:id',ProductController.Product)
Router.post('/comment/:id',is_logged,ProductController.CommentProduct)

export default Router