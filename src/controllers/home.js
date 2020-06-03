const ProductsModel = require('../models/products')
const CategoryModel = require('../models/categories')

module.exports = {
    async home(req,res){
        const limitPage = 9 //limite de paginação
        const page = req.params.page || 1 //pagina 

        const TotalRegister = await ProductsModel.TotalRegister()
        const Promotions = await ProductsModel.getPromotions()
        const NewsProducts = await ProductsModel.getNewProducts()
        const Products = await ProductsModel.Listar(page,limitPage)
        const Categories = await CategoryModel.Listar()
        
        res.render('home',{
            Products,
            Categories,
            TotalPages:TotalRegister[0].total/limitPage,
            ProductsPromotion:Promotions,
            ProductsNew:NewsProducts
        })
    }
}