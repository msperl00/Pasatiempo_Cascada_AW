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
let soluciones = [];

// Todas las funciones con un valor async, devuelve una promesa
async function getData() {
  const userData = {
    tipoJuego: 0,
  };

  //PETICIÓN DE TIPO POST
  axios
    .post("http://localhost:3000/api/soluciones", userData)
    .then((response) => {
      soluciones = response.data;
      validar();
    })
    .catch((err) => {
      console.log(err);
    });
}

/*Añadimos un action listener para la validación de las palabras */
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("tablero")
    .addEventListener("submit", validarPalabras);
});

function validar() {
  let espacioEnBlanco = false;

  // RECORREMOS LAS FILAS
  for (let index = 1; index <= numeroFilas; index++) {
    let elements = document.getElementsByClassName(index);
    let palabra = "";
    //RECORREMOS LA PALABRA
    for (let j = 0; j < elements.length; j++) {
      if (elements[j].value != "") {
        palabra += elements[j].value;
      } else {
        console.log("Encontrado espacio");
        espacioEnBlanco = true;
      }
    }
    // AÑADIMOS LA PALABRA AL ARRAY
    if (!espacioEnBlanco) {
      palabra = palabra.toLowerCase();
      filas.push(palabra);
      console.log("Palabra: " + palabra);
    } else {
      console.log("Saliendo");
      break;
    }
  }

  validarPalabras();

  //Si acepta cookies -> Guardamos cada vez que comprobamos
  if (localStorage.aceptaCookies == "true") {
    //Guardamos todas las filas
    console.log("Cokkies aceptadas")
    localStorage.setItem("Filas", JSON.stringify(filas));
    

  }
}


function validarPalabras() {
  console.log("En validar palabras con: " + filas.length);

  if (filas.length == 0) {
    window.alert("No existe ninguna referencia todavia");
  } else {
    let win = true;
    for (let i = 0; i < filas.length; i++) {
      if (soluciones[i].palabra === filas[i]) {
        window.alert("Palabra de la fila " + i + " CORRECTA!!!");

        if (i == 11) {
          window.alert("ENHORABUENA!!!");
        }
      } else {
        win = false;
        window.alert("Palabra de la fila " + i + " incorrecta");
        // VACIO EL ARRAY
        filas.length = 0;
      }
    }
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
  console.log("En cargando cookeis");
  var filasNuevas = localStorage.getItem("Filas");
  console.log(filasNuevas);
  filasNuevas = JSON.parse(filasNuevas);

  var element = 1;
  
  // Numero de palabras que tengo que añadir
  for (var i = 0; i < filasNuevas.length; i++){
    
    for (var j = 0; j < filasNuevas[i].length;j++){
      document.getElementById(element).value = filasNuevas[i][j];
      element++;
    }
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
