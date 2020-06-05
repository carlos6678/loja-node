const knex = require('../services/database')
const ProductsModel = require('../models/products')

module.exports = {
    async getProducts(cart_session){
        let products = []
        for(const item of cart_session){
            const info = await ProductsModel.InfoProduct(item.id)
            products.push({
                id:item.id,
                quantity:item.qt,
                name:info[0].name,
                price:info[0].price,
                photo:info[0].image_url[0].url
            })
        }
        return products
    }
}