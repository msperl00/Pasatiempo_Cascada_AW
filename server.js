// PARTE DEL SERVIDOR 

// CommonJS
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const app = express();

//MIDDLEWARE
// Ya no es necesario requerir el body-parser
app.use(express.json()); // Express ya lo tiene como dependencia
app.use(express.urlencoded({extended: true}));
app.use(cors()); // Por defecto, todas las rutas son accesibles para todos los dominios ahora

//ROUTES
app.use(require('./routes/juegos'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
// obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
var publicPath = path.resolve(__dirname, 'public');
// Para que los archivos estaticos queden disponibles.
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.get('/', function (req, res)
{
    res.render('index.html');
});

app.post('/views/pasatiempo.html', (req, res) => {

  res.render(path.join(__dirname +'/views/pasatiempo.html'));

});
app.post('/views/pasatiempo-1.html', (req, res) => {

  res.render(path.join(__dirname +'/views/pasatiempo-1.html'));

});
app.post('/views/pasatiempo-2.html', (req, res) => {

  res.render(path.join(__dirname +'/views/pasatiempo-2.html'));

});



  
app.listen(port, function() {
  console.log(`Aplicación ejemplo, escuchando el puerto ${port}!`);
});
