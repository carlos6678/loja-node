import knex from '../services/database'

class ProductsModel{
    public async TotalRegister(){
        return knex('products').count('id',{as:'total'})
    }
    public async Listar(page:number,limitPage:number):Promise<object>{
        const products = await knex('products')
        .select()
        .limit(limitPage)
        .offset((page-1)*limitPage)
        .where('available',0)
        
        if(products){
            return this.the_products_images(products)
        }
        return products

        
    }
    public async getPromotions():Promise<object>{
        const products = await knex('products')
        .select()
        .where('promotion',1)
        .limit(5)
        .orderBy('id','desc')

        if(products){
            return this.the_products_images(products)
        }
        return products
    }
    public async getNewProducts():Promise<object>{
        const products = await knex('products')
        .select()
        .where('is_new',1)
        .limit(5)
        .orderBy('id','desc')

        if(products){
            return this.the_products_images(products)
        }
        return products
    }
    public async the_products_images(products:any){
        const images_of_products = async() => {
            for(const product of products){
                product.image_url = await this.getImagesProduct(product.id)
            }
            return products
        } 
        return await images_of_products().then((data)=>{
            return data
        })
    }
    public async the_products_comments(product:object){
        product[0].comments=await this.getComments(product[0].id)
        for(let prod of product[0].comments){
            let name = await knex('users').select('name').where('id',prod.user_id)
            prod.username=name[0].name
        }
        return product
    }
    public async getComments(id:number){
        return knex('comments').select('user_id','body').where('product_id',id).orderBy('data','desc')
    }
    public async getImagesProduct(id:number){
        return knex('product_image').select('url').where('product_id',id)
    }
    public async getProduct(id:number){
        const product = await knex('products')
        .select()
        .where('id',id)
        if(product){
            return this.the_products_images(await this.the_products_comments(product))
        }
        return product
    }
    public async getFeatures(id:number){
        return knex('features')
        .select('name','value')
        .where('product_id',id)
    }
    public async InfoProduct(id:number){
        const product = await knex('products')
        .select('id','name','price','descricao')
        .where('id',id)
        if(product){
            return this.the_products_images(product)
        }
        return product
    }
    public async is_estoque(id:number){
        return knex('products').select('quantity').where('id',id)
    }
    public async infoFreteProduct(id:number){
        return knex('products')
        .select('price','weight','width','height','lenght','diameter')
        .where('id',id)
    }
    public async getBranch(id:number):Promise<null|object>{
        const branch_id = await knex('products')
        .select('branch_id')
        .where('id',id)

        if(branch_id){
            const branch = await knex('branch').select().where('id',branch_id[0].branch_id)

            return branch
        }

        return null
    }
    public async getCategoryProduct(id:number):Promise<null|object>{
        const category_id = await knex('products')
        .select('category_id')
        .where('id',id)

        if(category_id){
            const category = await knex('category').select().where('id',category_id[0].category_id)

            return category
        }

        return null
    }
    public async addComment(user_id:number,product_id:number,body:string){
        const temp = new Date()
        const data = `${temp.getFullYear()}-0${temp.getMonth()+1}-0${temp.getDate()} ${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`

        await knex('comments').insert({user_id,product_id,body,data})
    }
}

export default new ProductsModel()