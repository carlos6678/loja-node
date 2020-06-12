import {Request,Response} from 'express'
import ProductsModel from '../models/products'

class ProductController{
    public async Product(req:Request,res:Response):Promise<void>{
        const Product = await ProductsModel.getProduct(parseInt(req.params.id))
        const Features  = await ProductsModel.getFeatures(parseInt(req.params.id))
        const Branch = await ProductsModel.getBranch(parseInt(req.params.id))
        const Category = await ProductsModel.getCategoryProduct(parseInt(req.params.id))

        res.render('product',{
            Product,
            Features,
            Branch,
            Category
        })
    }
    public async CommentProduct(req:Request,res:Response):Promise<void>{
        const product_id=req.params.id
        const {comment} = req.body
        const {id} = req.session.logado[0]
        
        await ProductsModel.addComment(id,parseInt(product_id),comment)

        res.redirect(`/products/product/${product_id}`)
    }
}
export default new ProductController()
