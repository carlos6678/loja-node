const knex = require('../services/database')

module.exports={
    async Listar(){
        return knex('category').select('*')
    }
}