const knex = require('../services/database')

module.exports = {
    async TotalRegister(){
        return knex('products').count('id',{as:'total'})
    },
    async Listar(page,limitPage){
        const products = await knex('products')
        .select()
        .limit(limitPage)
        .offset((page-1)*limitPage)
        .where('available',0)
        
        if(products){
            return this.the_products_images(products)
        }
        return products

        
    },
    async getPromotions(){
        const products = await knex('products')
        .select()
        .where('promotion',1)
        .limit(5)
        .orderBy('id','desc')

        if(products){
            return this.the_products_images(products)
        }
        return products
    },
    async getNewProducts(){
        const products = await knex('products')
        .select()
        .where('is_new',1)
        .limit(5)
        .orderBy('id','desc')

        if(products){
            return this.the_products_images(products)
        }
        return products
    },
    async the_products_images(products){
        const images_of_products = async() => {
            for(const product of products){
                product.image_url = await this.getImagesProduct(product.id)
            }
            return products
        } 
        return await images_of_products().then((data)=>{
            return data
        })
    },
    async the_products_comments(product){
        product[0].comments=await this.getComments(product[0].id)
        for(prod of product[0].comments){
            let name = await knex('users').select('name').where('id',prod.user_id)
            prod.username=name[0].name
        }
        return product
    },
    async getComments(id){
        return knex('comments').select('user_id','body').where('product_id',id).orderBy('data','desc')
    },
    async getImagesProduct(id){
        return knex('product_image').select('url').where('product_id',id)
    },
    async getProduct(id){
        const product = await knex('products')
        .select()
        .where('id',id)
        if(product){
            return this.the_products_images(await this.the_products_comments(product))
        }
        return product
    },
    async getFeatures(id){
        return knex('features')
        .select('name','value')
        .where('product_id',id)
    },
    async InfoProduct(id){
        const product = await knex('products')
        .select('id','name','price','descricao')
        .where('id',id)
        if(product){
            return this.the_products_images(product)
        }
        return product
    },
    async is_estoque(id){
        return knex('products').select('quantity').where('id',id)
    },
    async infoFreteProduct(id){
        return knex('products')
        .select('price','weight','width','height','lenght','diameter')
        .where('id',id)
    },
    async getBranch(id){
        const branch_id = await knex('products')
        .select('branch_id')
        .where('id',id)

        if(branch_id){
            const branch = await knex('branch').select().where('id',branch_id[0].branch_id)

            return branch
        }

        return null
    },
    async getCategoryProduct(id){
        const category_id = await knex('products')
        .select('category_id')
        .where('id',id)

        if(category_id){
            const category = await knex('category').select().where('id',category_id[0].category_id)

            return category
        }

        return null
    },
    async addComment(user_id,product_id,body){
        const temp = new Date()
        const data = `${temp.getFullYear()}-0${temp.getMonth()+1}-0${temp.getDate()} ${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`

        await knex('comments').insert({user_id,product_id,body,data})
    }
}