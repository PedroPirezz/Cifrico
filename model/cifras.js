const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // importa a instância do Sequelize

const Cifras = sequelize.define('cifras', {
  nome: {
    type: DataTypes.STRING,
   },
  tom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  indice: {
    type: DataTypes.INTEGER,
    allowNull: false
  
  },
  arquivo: {
    type: DataTypes.BLOB('long'),
    allownull: true 
},
favoritado: {
  type: DataTypes.BOOLEAN,
  allowNull: false

}
}, {
  tableName: 'cifras', // Nome da tabela no banco
  timestamps: true   // Defina como `true` se a tabela tiver colunas `createdAt` e `updatedAt`
});

Cifras.sync({ force: false }).then(() => {
  console.log("cifras table connected with success")
})

module.exports = Cifras;
