const dbConfig = require('../config/database')
const knex =  require('knex')(dbConfig)

module.exports = knex