import knex from '../services/database'

class CategoriesModel{
    public async Listar(){
        return knex('category').select('*')
    }
    public async category_products(id:number){
        return knex('products')
        .select()
        .where('category_id',id)
    }
    public async getCategory(id:number){
        return knex('category')
        .select()
        .where('id',id)
    }
}

export default new CategoriesModel()