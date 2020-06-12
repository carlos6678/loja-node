import {Request,Response} from 'express'
import ProductsModel from '../models/products'
import CategoryModel from '../models/categories'

class HomeController{
    public async home(req:Request,res:Response):Promise<void>{
        const limitPage = 3 //limite de paginação
        const page = parseInt(req.params.page) || 1 //pagina 

        const TotalRegister:Array<any>= await ProductsModel.TotalRegister()
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

export default new HomeController()