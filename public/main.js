//Reloj de tiempo
var segundos = 0;
var minutos = 0;
var reloj = document.getElementById("reloj");

var filas = new Array();
var contadorAyuda = 0;
var contadorSolucion = 0;

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

  //Contador a 0
  contadorAyuda = 0;

  for (let index = 0; index < 3; index++) {
    index++;
    var aux = "Pista" + index.toString();
    ////console.log(aux);
    document.getElementById(aux).style.display = "none";
    index--;
  }

  minutos = 0;
  segundos = 0;
}

function exitoCallback(resultado) {
  //console.log("Exito en la promesa");
}

function falloCallback(error) {
  //console.log("Error en la promesa");
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
        //console.log(arrayData[i]);
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
    validarPalabra(className);
  }

  //Si acepta cookies -> Guardamos cada vez que comprobamos
  if (localStorage.aceptaCookies == "true") {
    //Guardamos todas las filas
    localStorage.setItem("Filas", filas);
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
  if (soluciones[index - 1] == palabra) return true;

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

  //Añadimos la palabra al array de palabras.
  filas.push(palabra);

  if (palabra != "") {
    //2. Validamos si las casillas estan vacias
    for (let index = 0; index < elements.length; index++) {
      //console.log(elements[index].value);
      //Vemos si existen casillas vacias
      if (elements[index].value == "") {
        palabraDiccionario = false;
      }
    }

    //console.log(palabra);
    if (palabraDiccionario && isPalabraDiccionario(palabra)) {
      window.alert(
        "Palabra de la fila " + className + " dentro del diccionario"
      );
      if (isPalabraSolucion(palabra, className)) {
        window.alert("Palabra de la fila " + className + " es solución");
        contadorSolucion++;
        if (contadorSolucion == 12) {
          window.alert("Pasapalabra resuelto");
        }
      } else
        window.alert(
          "Palabra de la fila " +
            className +
            " es solución pero no es la fila correcta"
        );
    } else window.alert("Palabra que NO esta dentro del diccionario");
  } else {
    //console.log("Fila vacia");
  }
}

/* ésto comprueba la localStorage si ya tiene la variable guardada */
function compruebaAceptaCookies() {
  if (localStorage.aceptaCookies == "true") {
    cajacookies.style.display = "none";
  }
}

/* aquí guardamos la variable de que se ha
  aceptado el uso de cookies así no mostraremos
  el mensaje de nuevo */
function aceptarCookies() {
  //Tratamiento de visionado de la interfaz
  localStorage.aceptaCookies = "true";
  cajacookies.style.display = "none";
  cookies.style.display = "";
}

function eliminarCookies() {
  localStorage.aceptaCookies = "false";
  cajacookies.style.display = "";
  window.alert("Cookies borradas!");

  reseteo();

  localStorage.clear();
}

function cargarCookies() {
  //Cargamos todas las filas
  var filasNuevas = localStorage.getItem("Filas");
  var element = 1;

  let index = 0;
  while (index < filasNuevas.length) {
    //console.log("Filas nuevas: " + filasNuevas[index]);
    if (filasNuevas[index] != ",") {
      // console.log("Filas nuevas: "+filasNuevas[index]);
      document.getElementById(element).value = filasNuevas[index];
      // document.getElementById(element.toString()).innerHTML = filasNuevas[index];
      element++;
    }
    index++;
  }
}

function ayuda() {
  contadorAyuda++;

  if (contadorAyuda <= 3) {
    console.log(contadorAyuda);
    var id = "Pista" + contadorAyuda.toString();
    document.getElementById(id).style.display = "block";
  }

  for (let index = 1; index <= numeroFilas; index++) {
    let className = index.toString();

    //1. Recogemos las casillas
    var elements = document.getElementsByClassName(className);
    let palabra = "";

    // 1.1 Pasamos el HTMLCONTENT a String
    for (let index = 0; index < elements.length; index++) {
      palabra += elements[index].value;
    }

    var elementosAyuda = new Array();
    var contador = 0;

    for (let index = 0; index < arrayData.length; index++) {
      // console.log(palabra);
      if (arrayData[index].indexOf(palabra)) {
        elementosAyuda.push(arrayData[arrayData[index].indexOf(palabra)]);
        document.getElementById(Pista1).value = "Hola2";
      }
    }
  }
}

/* ésto se ejecuta cuando la web está cargada */
$(document).ready(function () {
  localStorage.aceptaCookies = "false";
  compruebaAceptaCookies();
});


