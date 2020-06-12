import { Request,Response } from 'express'
import CategoryModel from '../models/categories'
import ProductModel from '../models/products'

class CategoryController{
    public async category_product(req:Request,res:Response):Promise<void>{
        const Products = await ProductModel.the_products_images(
            await CategoryModel.category_products(req.params.id)
        )
        const Category = await CategoryModel.getCategory(req.params.id)
        res.render('category_product',{
            Products,
            Category
        })
    }
}

export default new CategoryController()