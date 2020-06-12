import { Request,Response } from 'express'
import CartModel from '../models/cart'
import ProductModel from '../models/products'
import FreteService from '../services/frete'

class CartController{
    public async homeCart(req:Request,res:Response):Promise<void>{
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
    }
    public async add(req:Request,res:Response):Promise<void>{
        let { productID,quantityProduct } = req.body
        productID = parseInt(productID)
        quantityProduct = parseInt(quantityProduct)

        if(!req.session.cart){
            req.session.cart=[] 
        }

        if(req.session.cart.length>0){
            req.session.cart.forEach((item:object|any) => {
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
    }
    public async delete(req:Request,res:Response):Promise<void>{
        if(req.params.id){
            req.session.cart.forEach((item,index)=>{
                if(item.id==req.params.id){
                    req.session.cart.splice(index,1)
                }
            })
        }
        res.redirect('/cart/mycart')
    }
    public async subtraction(req:Request,res:Response):Promise<void>{
        if(req.params.id){
            req.session.cart.forEach((item:any,index:number)=>{
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
    }
    public async addUnidade(req:Request,res:Response):Promise<void>{
        if(req.params.id){
            for(let item of req.session.cart){
                if(item.id==req.params.id){
                    let estoque = await ProductModel.is_estoque(parseInt(req.params.id))
                    if(item.qt+1 <= estoque[0].quantity){
                        item.qt+=1
                    }
                }
            }
        }
        res.redirect('/cart/mycart')
    }
    public async calcFrete(req:Request,res:Response):Promise<void>{
        const { product_id:product,quantity,cep } = req.body
        const url:string|false = await FreteService.urlFrete(product,quantity,cep)
        if(url){
            const parseString = require('xml2js').parseString
            const axios = require('axios').default

            axios.get(url,{headers:{'Content-Type':'text/xml'}}).then((result:any)=>{
                parseString(result.data,(err:never,resp:any)=>{
                    const {Valor,PrazoEntrega} = resp.Servicos.cServico[0]
                    res.send({
                        Valor:Valor[0],
                        PrazoEntrega:parseInt(PrazoEntrega[0])+2,
                        cep
                    })
                })
            }).catch((err:never):void=>{console.log(err)})
        }
    }
}

export default new CartController()