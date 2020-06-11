const ProductsModel = require('../models/products')

module.exports = {
    async Product(req,res){
        const Product = await ProductsModel.getProduct(req.params.id)
        const Features  = await ProductsModel.getFeatures(req.params.id)
        const Branch = await ProductsModel.getBranch(req.params.id)
        const Category = await ProductsModel.getCategoryProduct(req.params.id)

        res.render('product',{
            Product,
            Features,
            Branch,
            Category
        })
    },
    async CommentProduct(req,res){
        const product_id=req.params.id
        const {comment} = req.body
        const {id} = req.session.logado[0]
        
        await ProductsModel.addComment(id,product_id,comment)

        res.redirect(`/products/product/${product_id}`)
    }
} 