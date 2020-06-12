import express from 'express'
import CategoryController from '../controllers/category'

const Router = express.Router()

Router.get('/categoria/:id',CategoryController.category_product)
 
export default Router