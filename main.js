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
    window.alert("Reinicioamos tiempo y pasatiempo");

    minutos = 0;
    segundos = 0;
}