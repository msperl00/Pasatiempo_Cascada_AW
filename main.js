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

  var elements = document.querySelectorAll("input[type='text']");

  for (var i = 0; i < elements.length; i++) {
    elements[i].value = "";
  }

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

const numeroFilas = 12;
let soluciones = [
  "clan",
  "cian",
  "nací",
  "nace",
  "cena",
  "pena",
  "remato",
  "remoto",
  "motero",
  "lotero",
  "tolero",
  "torero",
];

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

      validar();
    });
}

/*Añadimos un action listener para la validación de las palabras */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("tablero").addEventListener("submit", validarPalabra);
});

//Creamos la palabra local
var palabra;

function validar() {
  //Iteramos todas las filas, para comprobar si estan o no vacias
  for (let index = 1; index <= numeroFilas; index++) {
    let className = index.toString();
    console.log(className);
    validarPalabra(className);
  }
}

function isPalabraDiccionario(palabra) {
  for (let index = 0; index < arrayData.length; index++) {
    if (arrayData[index] == palabra) return true;
  }
  return false;
}

function isPalabraSolucion(palabra, className) {
  let index = parseInt(className, 10);
  // -1 PORQUE LA CLASE EMPIEZA EN 0
  if (soluciones[index-1] == palabra) return true;

  return false;
}

function validarPalabra(className) {
  var palabraDiccionario = true;

  //1. Recogemos las casillas
  var elements = document.getElementsByClassName(className);
  let palabra = "";

  // 1.1 Pasamos el HTMLCONTENT a String
  for (let index = 0; index < elements.length; index++) {
    palabra += elements[index].value;
  }

  // Pasamos la palabra a minuscula
  palabra = palabra.toLowerCase();

  if (palabra != "") {
    //2. Validamos si las casillas estan vacias
    for (let index = 0; index < elements.length; index++) {
      console.log(elements[index].value);
      //Vemos si existen casillas vacias
      if (elements[index].value == "") {
        palabraDiccionario = false;
      }
    }

    console.log(palabra);
    if (palabraDiccionario && isPalabraDiccionario(palabra)) {
      window.alert(
        "Palabra de la fila " + className + " dentro del diccionario"
      );
      if (isPalabraSolucion(palabra, className))
        window.alert("Palabra de la fila " + className + " es solución");
      else
        window.alert(
          "Palabra de la fila " +
            className +
            " es solución pero no es la fila correcta"
        );
    } else window.alert("Palabra que NO esta dentro del diccionario");
  } else {
    console.log("Fila vacia");
  }
}
