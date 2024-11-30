const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Rota para listar todos os usuários
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Usuários!');
});
// Definir a porta do servidor
const PORT = 80;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
