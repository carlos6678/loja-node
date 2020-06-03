const knex = require('../services/database')
const ProductsModel = require('../models/products')

module.exports = {
    async getProducts(cart_session){
        let products = []
        const cart = cart_session

        for(const [id,qt] of cart.entries()){
            const info = await ProductsModel.InfoProduct(id)
            console.log(id)
            products.push({
                id:id,
                quantity:qt,
                name:info[0].name,
                price:info[0].price,
                photo:info[0].image_url[0].url
            })
        }
        return products
    }
}