const CartModel = require('../models/cart')
const ProductModel = require('../models/products')

module.exports = {
    async homeCart(req,res){
        if(!req.session.cart){
            res.redirect('/')
        }
        const Products = await CartModel.getProducts(req.session.cart)

        let subtotal = 0
        Products.forEach(product=>{
            subtotal += (product.price)*(product.quantity)
        })

        res.render('cart',{
            Products,
            subtotal
        })
    },
    async add(req,res){
        let { productID,quantityProduct } = req.body
        productID = parseInt(productID)
        quantityProduct = parseInt(quantityProduct)

        if(!req.session.cart){
            req.session.cart=[] 
        }

        if(req.session.cart.length>0){
            req.session.cart.forEach(item => {
                if(item.id==productID){
                    item.qt+=quantityProduct
                    res.redirect('/cart/mycart')
                }
            });
            req.session.cart.push({id:productID,qt:quantityProduct})
        }else{
            req.session.cart.push({id:productID,qt:quantityProduct})
        }

        res.redirect('/cart/mycart')
    },
    async delete(req,res){
        if(req.params.id){
            req.session.cart.forEach((item,index)=>{
                if(item.id==req.params.id){
                    req.session.cart.splice(index,1)
                }
            })
        }
        res.redirect('/cart/mycart')
    },
    async subtraction(req,res){
        if(req.params.id){
            req.session.cart.forEach((item,index)=>{
                if(item.id==req.params.id){
                    if(item.qt==1){
                        req.session.cart.splice(index,1)
                    }else{
                        item.qt-=1
                    }
                }
            })
        }
        res.redirect('/cart/mycart')
    },
    async addUnidade(req,res){
        if(req.params.id){
            for(let item of req.session.cart){
                if(item.id==req.params.id){
                    let estoque = await ProductModel.is_estoque(req.params.id)
                    if(item.qt+1 <= estoque[0].quantity){
                        item.qt+=1
                    }
                }
            }
        }
        res.redirect('/cart/mycart')
    }
}