require('dotenv').config()
const config = require('config')

module.exports = {
  [config.util.getEnv('NODE_ENV')]: {
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      tableName: './seeds',
      directory: './db/seeds'
    },
    client: 'mysql',
    debug: false,
    connection: {
      host: config.get('database.host'),
      port: config.get('database.port'),
      user: config.get('database.username'),
      password: config.get('database.password'),
      database: config.get('database.database'),
      charset: 'utf8'
    }
  }
}