import knex from '../services/database'
import encrypt from '../services/encrypt'

class UserModel {
    public async AccountExists({email,password}){
        return knex('users').select('id','email','name').where({email,password:encrypt(password)})
    }
    public async EmailExists({email}){
        return knex('users').where('email',email).select('id')
    }
    public async saveCredentials(body:object|any){
        body.password=encrypt(body.password)
        return knex('users').insert(body)
    }
}

export default new UserModel()