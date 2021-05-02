//Reloj de tiempo
var segundos =  0;
var minutos = 0;
var reloj = document.getElementById("reloj");

window.setInterval(function() {
    reloj.innerHTML = minutos+" m "+segundos+" s";
    segundos++;
    if(segundos == 60){
        minutos++;
        segundos = 0;
    }
},1000);

function reseteo(){
    window.alert("Reiniciamos tiempo y pasatiempo");
    //Le damos la iteración al primer elemento
    document.getElementById("1").focus();
    minutos = 0;
    segundos = 0;
}

const url = "https://ordenalfabetix.unileon.es/aw/diccionario.txt";
let arrayData = new Array();
var separador = "\n";

// Todas las funciones con un valor async, devuelve una promesa
async function getData(){

    // Fetch devuelve un objeto promise contieniendo la respuesta en un objeto Response.
    // Un objeto response es una respuesta de tipo HTTP, no el propio texto.
    // Cors sirve hacer solicitudes seguras
   fetch(url, {
       method: 'GET',
        mode: 'cors'
   })
   .then(response => response.text())
   .then(data => {
   arrayData =  data.split(separador);
   });

   //Salida por pantalla de la información
   for (var i=0; i < arrayData.length; i++) {
    console.log(arrayData[i]);
 }

}

/*Añadimos un action listener para la validación de las palabras */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("tablero").addEventListener('submit', validarPalabra); 
  });

  function validarPalabra() {
    
    

    var elements = document.getElementsByClassName("palabra");
  



  }






 