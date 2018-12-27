const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipeapp',
  password: '123456',
  port: 5432,
})

pool.connect()

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}