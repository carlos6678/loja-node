const CartModel = require('../models/cart')

module.exports = {
    async homeCart(req,res){
        if(!req.session.cart){
            res.redirect('/')
        }
        const Products = await CartModel.getProducts(req.session.cart)
        res.render('cart',{
            Products
        })
    },
    async add(req,res){
        let { productID,quantityProduct } = req.body
        productID = parseInt(productID)
        quantityProduct = parseInt(quantityProduct)

        if(!req.session.cart){
            req.session.cart=[] 
        }

        if(req.session.cart[productID]){
            req.session.cart[productID]+=quantityProduct
        }else{
            req.session.cart[productID]=quantityProduct
        }

        res.redirect('/cart/mycart')
    }
}