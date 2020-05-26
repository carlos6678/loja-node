const ProductsModel = require('../models/products')

module.exports = {
    async Product(req,res){
        const Product = await ProductsModel.getProduct(req.params.id)
        const Features  = await ProductsModel.getFeatures(req.params.id)
        
        res.render('product',{
            Product,
            Features
        })
    }
} 