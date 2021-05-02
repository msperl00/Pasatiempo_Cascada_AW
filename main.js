//Reloj de tiempo
var segundos = 0;
var minutos = 0;
var reloj = document.getElementById("reloj");

window.setInterval(function () {
  reloj.innerHTML = minutos + " m " + segundos + " s";
  segundos++;
  if (segundos == 60) {
    minutos++;
    segundos = 0;
  }
}, 1000);

function reseteo() {
  window.alert("Reiniciamos tiempo y pasatiempo");
  //Le damos la iteración al primer elemento
  document.getElementById("1").focus();
  minutos = 0;
  segundos = 0;
}

function exitoCallback(resultado) {
  console.log("Exito en la promesa");
}

function falloCallback(error) {
  console.log("Error en la promesa");
}

const url = "https://ordenalfabetix.unileon.es/aw/diccionario.txt";
let arrayData = new Array();
var separador = "\n";





// Todas las funciones con un valor async, devuelve una promesa
async function getData() {
  
    // Fetch devuelve un objeto promise contieniendo la respuesta en un objeto Response.
    // Un objeto response es una respuesta de tipo HTTP, no el propio texto.
    // Cors sirve hacer solicitudes seguras
    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.text())
      .then((data) => {
        arrayData = data.split(separador);

    /*Salida por pantalla de la información
      for (var i = 0; i < arrayData.length; i++) {
        console.log(arrayData[i]);
      }
      */

        validarPalabra();
      })

    
   

}

/*Añadimos un action listener para la validación de las palabras */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("tablero").addEventListener("submit", validarPalabra);
});

//Creamos la palabra local
var palabra;

function validarPalabra() {


  var palabraDiccionario = true;
  //1. Recogemos las casillas
  var elements = document.getElementsByClassName("palabra");

  // 1.1 Pasamos el Htmal contect a String

  let palabra = "";
  for (let index = 0; index < elements.length; index++) {
    palabra += elements[index].value;
  }

  //  console.log(palabra);

  //2. Validamos si las casillas estan vacias
  for (let index = 0; index < elements.length; index++) {
  
    console.log(elements[index].value);
    //Vemos si existen casillas vacias
    if (elements[index].value == "") {
      window.alert("Faltan letras en la palabra por completar");
      palabraDiccionario = false;
    }
  }

  if (palabraDiccionario && isPalabraDiccionario( palabra))
    window.alert("Palabra dentro del diccionario");
  else window.alert("Palabra que NO esta dentro del diccionario");
}

function isPalabraDiccionario(palabra) {
  for (let index = 0; index < arrayData.length; index++) {
     
    if (arrayData[index] == palabra) return true;
  }
  return false;
}


