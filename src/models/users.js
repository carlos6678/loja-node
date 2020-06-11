const knex = require('../services/database')
const encrypt = require('../services/encrypt')

module.exports = {
    async AccountExists({email,password}){
        return knex('users').select('id','email','name').where({email,password:encrypt(password)})
    },
    async EmailExists({email}){
        return knex('users').where('email',email).select('id')
    },
    async saveCredentials(body){
        body.password=encrypt(body.password)
        return knex('users').insert(body)
    }
}