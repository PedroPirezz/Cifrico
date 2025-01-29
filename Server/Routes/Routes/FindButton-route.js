const { app } = require('../../../app');

app.post('/findbutton', (req, res) => {
  let tom = req.body.tom;
  let indice = req.body.indice;
  console.log(tom, indice);

  res.redirect('cancao/' + tom + '/' + indice);
});
