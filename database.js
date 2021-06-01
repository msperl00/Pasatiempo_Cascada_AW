//CONEXION CON LA BASE DE DATOS

const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pasatiempo'
});


connection.connect(function (err, conn) {

    if(err) {
        console.log(err);
    }else{
        console.log("Data base connected");
    }
})

connection.query('SELECT * FROM pasatiempo.soluciones;', function(err, rows, fields) {
    if (err) throw err;
   // console.log('The solution is: ', rows);
  });

//connection.end();
module.exports = connection;