const CategoryModel = require('../models/categories')
const ProductModel = require('../models/products')

module.exports={
    async category_product(req,res){
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