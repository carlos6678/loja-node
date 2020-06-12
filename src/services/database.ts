interface configdb{
    client:string,
    connection:{
        host:string,
        user:string,
        password:string,
        database:string
    }
}
import dbConfig from '../config/database'
import knex from 'knex'

const Config:configdb = dbConfig 
const database = knex(Config)

export default database 