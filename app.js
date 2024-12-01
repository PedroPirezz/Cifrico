const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const User = require('./model/users');
const sequelize = require('./model/index');

app.use(bodyParser.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
})();
app.get('/deletar/:id', (req, res) => {
  let id = req.params.id;
  User.destroy({
    where: {
      id: id
    }
  })
  res.redirect('/');
})


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

const PORT = 80;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});


