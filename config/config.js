module.exports = {
  development: {
    username: 'postgres',
    password: '3H9iuRFyTNLuFUm9',
    database: 'postgres',
    host: 'manfully-paternal-panda.data-1.use1.tembo.io',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: false, // ou true se necessário
        rejectUnauthorized: false
      }
    }
  }
};
