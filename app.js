const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const User = require('./model/users');

app.use(bodyParser.json());




const sequelize = require('./model/index');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
    // DB.Financeiro.create({ IDCuidadoso: idcuidadoso, IDSolicitacao: idsolicitacao, NomeCuidadoso: solicitacao.NomeCuidadoso, DataAceitacao: dataFormatada, ValoraPagar: ValorTaxa, ValorTotal: solicitacao.Valor, Status: 'Pendente' }); //
    
    // Buscando os dados
    // const users = await User.findAll();
    // console.log('Usuários:', users);

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
  // Não feche a conexão aqui se ainda estiver fazendo consultas
  // await sequelize.close();
})();

app.get('/cadastro/:id/:name/:email', async (req, res) => {
let id = req.params.id;
let name = req.params.name; 
let email = req.params.email;

User.create({
  id: id,
  name: name,
  email: email
})
res.redirect('/');

});


// Rota para listar todos os usuários

app.get('/', (req, res) => {
  (async () => {
    try {
      // Buscar todos os usuários
      const users = await User.findAll();
      console.log('Usuários:', users);
      res.json(users);
  
      
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  })();
});
// Definir a porta do servidor
const PORT = 80;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
