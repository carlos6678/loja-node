const knex = require('../services/database')

module.exports={
    async Listar(){
        return knex('category').select('*')
    },
    async category_products(id){
        return knex('products')
        .select()
        .where('category_id',id)
    },
    async getCategory(id){
        return knex('category')
        .select()
        .where('id',id)
    }
}