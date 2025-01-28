const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.urlencoded({ extended: true }));
const sequelize = require('./model/index');
const Cifras = require('./model/cifras');
const path = require('path');
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views')); // Caminho correto da pasta views
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

 
app.get('/', (req, res) => {
  Cifras.findAll({ raw: true, where: { favoritado: true }, order: [['updatedAt', 'ASC']] }).then(cifrasfavoritas => {
    Cifras.findAll({ raw: true, attributes: ['nome', 'tom', 'indice'] }).then(todascifras => {
   
    res.render('index.ejs', { cifrasfavoritas: cifrasfavoritas, todascifras: todascifras });
    })
  })
});
  


app.get('/limpar', (req, res) => {

  Cifras.update({ favoritado: false }, { where: { favoritado: true } }).then(cifracerta => {
    res.redirect('/');
  })
  
}) 

app.post('/buscar', (req, res) => {
  let tom = req.body.tom;
  let indice = req.body.indice;
  console.log(tom, indice)

  res.redirect('cancao/' + tom + '/' + indice);
})
app.get('/cancao/:tom/:indice', (req, res) => {
  const toma = req.params.tom;
  const indicea = req.params.indice;

  Cifras.findAll({ raw: true, where: { tom: toma, indice: indicea } }).then(cifracerta => {
    if (cifracerta.length == 0) {
      res.redirect('/');
    }else{ 
 
      res.render('starter-page.ejs', { cifra: cifracerta  });
    }
  })
}); 

app.get('/only/:tom/:indice', (req, res) => {
  const toma = req.params.tom;
  const indicea = req.params.indice;

  Cifras.findAll({ raw: true, where: { tom: toma, indice: indicea } }).then(cifracerta => {
    console.log(cifracerta)
    res.render('onlycipher.ejs', { cifra: cifracerta  });
  })
});

app.post('/findbyname', (req, res) => {
  let name = req.body.nome;
  Cifras.findOne({ raw: true, where: { nome: name } }).then(cifracerta => {
    if (cifracerta == null) {
      res.redirect('/');
    }else{
      res.redirect('cancao/' + cifracerta.tom + '/' + cifracerta.indice);
      
    }
  })
 
  
})

app.post('/favoritar/:tom/:indice', (req, res) => {
  const toma = req.params.tom;
  const indicea = req.params.indice;
  Cifras.update({ favoritado: true }, { where: { tom: toma, indice: indicea } }).then(cifracerta => {
    res.redirect('/');
  })
})

app.post('/desfavoritar/:tom/:indice', (req, res) => {
  console.log("Desfavoritou")
  const toma = req.params.tom;
  const indicea = req.params.indice;
  Cifras.update({ favoritado: false }, { where: { tom: toma, indice: indicea } }).then(cifracerta => {
    res.redirect('/cancao/' + toma + '/' + indicea);
  })
})

app.get("/lista", (req, res) => {
  Cifras.findAll({ raw: true, attributes: ['nome', 'tom', 'indice'] }).then(cifracerta => {
    console.log(cifracerta)
    res.send(cifracerta)
  })
})


const PORT = 80;
app.listen(80)

