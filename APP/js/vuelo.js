import { comprobarSesion } from './sesion.js';

comprobarSesion();

const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3100;

// enlace al incio de la app
const titulo = document.getElementById('titulo')
titulo.style.cursor = "pointer";
titulo.addEventListener('click', () => {
    window.location.href = '../index.html';
});
const itinerario = document.getElementById("itinerario");
// recogida de parametros
const parametros = new URLSearchParams(window.location.search)
const id1 = parametros.get("id1");
const id2 = parametros.get("id2");

function recuperarInfoVuelo(id) {
    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/vuelos/${id}`;
    fetch(url, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los vuelos');
            }
            return response.json();
        })
        .then(data => {
            representarInfoVuelo(data);
        });
}
function representarInfoVuelo(vuelo) {
    console.log(vuelo);
    let infoVuelo = document.createElement("div");
    infoVuelo.classList.add("d-flex");
    infoVuelo.classList.add("gap-2");
    infoVuelo.classList.add("justify-content-between");

    let salida = document.createElement("div");
    let fechaIda = document.createElement("p");
    fechaIda.innerText = vuelo.fecha_ida.split('T')[0];
    salida.appendChild(fechaIda);
    
    let lugarSalida = document.createElement("p");
    lugarSalida.innerText = vuelo.id_aeropuerto_salida;
    salida.appendChild(lugarSalida);
    
    let llegada = document.createElement("div");
    let destino = document.createElement("p");
    destino.innerText = vuelo.id_aeropuerto_destino;
    llegada.appendChild(destino);
    
    let tiempos = document.createElement("div");
    let parrafoTiempo = document.createElement("p");
    parrafoTiempo.innerText=vuelo.duracion + " minutos";
    tiempos.appendChild(parrafoTiempo);

    infoVuelo.appendChild(salida);
    infoVuelo.appendChild(llegada);
    infoVuelo.appendChild(tiempos);
    
    itinerario.appendChild(infoVuelo);
}



recuperarInfoVuelo(id1);
recuperarInfoVuelo(id2);
