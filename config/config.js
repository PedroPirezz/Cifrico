module.exports = {
  development: {
    username: 'postgres',
    password: 'biacs5f36nPdEGM0',
    database: 'cifrico',
    host: 'zestfully-flashy-taipan.data-1.use1.tembo.io',
    port: 5432, 
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
      ssl: {
        require: false, // ou true se necessário
        rejectUnauthorized: false
      }
    }
  }
};
