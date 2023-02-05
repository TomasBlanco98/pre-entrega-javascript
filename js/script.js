// CONSTANTES Y VARIABLES
const botones = document.querySelectorAll(".boton");
const mensaje = document.querySelector(".mensaje");
const puntos = document.getElementById("puntaje");
const ataque = document.getElementById("ataque");
const pc = document.getElementById("pc");
const peleas = document.getElementById("divPeleas");
const mejoresPuntos = document.getElementById("mejorPuntaje");
const miForm = document.getElementById("form")
const tabla = document.getElementById("tablaPosiciones");
const contenedorPosiciones = document.getElementById("contenedorPosiciones")

let computadora;
let resultadoParcial;
let mejorResultado;

// FUNCIONES

function igualQue(x) {
    return (m) => m == x
}
let igualQueCero = igualQue(0);
let igualQueDos = igualQue(2);

function maquina() {
    computadora = Math.round(Math.random() * 2);
    pc.innerHTML = ataqueComputadora[computadora];
}

function player(jugador) {

    if (jugador < computadora) {
        if ( igualQueCero(jugador) && igualQueDos(computadora)) {
            verResultado("Ganaste", "verde");
            sumarResultado();
        } else {
            verResultado("Perdiste", "rojo");
            restartResultado();
        }
    } else if (jugador > computadora) {
        if (igualQueDos(jugador) && igualQueCero(computadora)) {
            verResultado("Perdiste", "rojo");
            restartResultado();
        } else {
            verResultado("Ganaste", "verde");
            sumarResultado();
        }
    } else {
        verResultado("Empate", "azul");
    }
}

function verResultado (resultado, color) {
    peleas.innerHTML=`<p id='resultado' class='${color}'>${resultado}</p>`;
}

function sumarResultado() {
    resultadoParcial ++;
}

function restartResultado() {
    posiciones.push(new Posicion(nombre, resultadoParcial));
    posiciones.sort((a, b) => b.puntaje - a.puntaje);
    localStorage.setItem("posiciones", JSON.stringify(posiciones));
    resultadoParcial = 0;
}

function generarMejorResultado() {
    if (mejorResultado <= resultadoParcial) {
        mejorResultado = resultadoParcial;
    } else {
        mejorResultado = mejorResultado;
    }
    localStorage.setItem("mejoresResultados", mejorResultado);
    mejoresPuntos.innerHTML = `Mejor resultado: ${mejorResultado}`;
}

function cargarPosiciones() {
    contenedorPosiciones.innerHTML = '';
    posiciones.forEach(posicion => {
        const ul = document.createElement("ul");
        ul.innerHTML = `<li>${posicion.nombre}</li><a>${posicion.puntaje}</a>`;
        contenedorPosiciones.append(ul);
    })
}

// CLASES

class Posicion {
    constructor(nombre, puntaje) {
        this.nombre = nombre;
        this.puntaje = puntaje;
    }
}
const posiciones = [];
posiciones.push(new Posicion("Fabrizio", 1));
posiciones.push(new Posicion("Lautaro", 0));
posiciones.push(new Posicion("Juana", 3));
posiciones.push(new Posicion("Milagros", 2));
posiciones.push(new Posicion("Lionel", 4));
posiciones.sort((a, b) => b.puntaje - a.puntaje);


if (localStorage.getItem("mejoresResultados") == null) {
    mejorResultado = 0;
} else {
    mejorResultado = localStorage.getItem("mejoresResultados");
}

if (localStorage.getItem("puntos") == null) {
    resultadoParcial = 0
} else {
    resultadoParcial = localStorage.getItem("puntos");
}

const ataqueJugador = ['<img class="eleccionJugador" src="img/piedra.jpg" alt="Piedra">', '<img class="eleccionJugador" src="img/papel.jpg" alt="Papel">', '<img class="eleccionJugador" src="img/tijera.jpg" alt="Tijera">']
const ataqueComputadora = ['<img class="eleccionComputadora" src="img/piedra.jpg" alt="Piedra">', '<img class="eleccionComputadora" src="img/papel.jpg" alt="Papel">', '<img class="eleccionComputadora" src="img/tijera.jpg" alt="Tijera">']

// INICIO DE JUEGO 

mejoresPuntos.innerHTML=`Mejor resultado: ${mejorResultado}`;
puntos.innerHTML=`Resultado: ${resultadoParcial}`;
cargarPosiciones();

miForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formulario = e.target;
    nombre = document.getElementById("nombre").value.toUpperCase();
    mensaje.innerText = nombre;
    localStorage.setItem("nombre", nombre);
});

botones.forEach(boton => {
    boton.addEventListener("click", seleccionarAtaque);
    function seleccionarAtaque() {
        if(nombre != mensaje.innerText) {
            return false;
        } 
        maquina();
        player(this.dataset.eleccion);
        puntos.innerHTML=`Resultado: ${resultadoParcial}`;
        ataque.innerHTML = ataqueJugador[this.dataset.eleccion];
        localStorage.setItem("puntos", resultadoParcial);
        generarMejorResultado();
        cargarPosiciones();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("nombre") && resultadoParcial != 0) {
        nombre = localStorage.getItem("nombre");
        mensaje.innerText = nombre;
    }
});