// PARTE DEL SERVIDOR 

// CommonJS
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors()); // Por defecto, todas las rutas son accesibles para todos los dominios ahora

// obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
var publicPath = path.resolve(__dirname, 'public');
// Para que los archivos estaticos queden disponibles.
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;


app.get('/', function(req, res) {
  //res.send('Hola Mundo!');
  res.render(path.join(__dirname+'/css/index.html'));
});

app.get('/', (req, res) => {
    return res.send('Recibió un método GET');
  });
  
  app.post('/', (req, res) => {
    return res.send('Recibió un método POST');
  });
  
  app.put('/', (req, res) => {
    return res.send('Recibió un método PUT');
  });
  
  app.delete('/', (req, res) => {
    return res.send('Recibió un método DELETE');
  });

app.listen(port, function() {
  console.log(`Aplicación ejemplo, escuchando el puerto ${port}!`);
});
