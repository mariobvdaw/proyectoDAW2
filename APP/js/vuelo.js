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
const divIda = document.getElementById("ida");
const divVuelta = document.getElementById("vuelta");
// recogida de parametros
const parametros = new URLSearchParams(window.location.search)
const id1 = parametros.get("id1");
const id2 = parametros.get("id2");

async function recuperarInfoVuelo(id) {
    try {
        let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/vuelos/${id}`;
        const response = await fetch(url, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al obtener los vuelos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

async function recuperarInfoAerolinea(id) {
    try {
        let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/aerolineas/${id}`;
        const response = await fetch(url, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al obtener los vuelos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

async function recuperarInfoAeropuerto(id) {
    try {
        let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/aeropuertos/${id}`;
        const response = await fetch(url, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al obtener los vuelos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

async function representarInfoVuelo(vuelo, viaje, div) {
    console.log(vuelo);
    // cabecera
    let cabecera = document.createElement("div");
    cabecera.classList.add("d-flex");
    cabecera.classList.add("justify-content-between");

    let aerolinea = document.createElement("div");
    aerolinea.classList.add("d-flex");
    aerolinea.classList.add("gap-3");
    aerolinea.innerHTML = `<div>${viaje}</div>`;

    let aerolineaInfo = await recuperarInfoAerolinea(vuelo.id_aerolinea);
    aerolinea.innerHTML += aerolineaInfo.nombre;

    cabecera.appendChild(aerolinea);

    let fechaSalida = document.createElement("div");
    fechaSalida.innerText = new Date(vuelo.fecha_ida).toLocaleDateString();
    cabecera.appendChild(fechaSalida);

    div.appendChild(cabecera);


    let resumen = document.createElement("div");
    resumen.classList.add("d-flex");
    resumen.classList.add("align-items-center");
    resumen.classList.add("gap-5");
    let salida = document.createElement("div");
    salida.classList.add("datos-aeropuerto");

    let aeropuertoSalida = await recuperarInfoAeropuerto(vuelo.id_aeropuerto_salida);

    let datosSalida = document.createElement("div");
    datosSalida.classList.add("d-flex");
    datosSalida.classList.add("gap-2");
    datosSalida.classList.add("fw-bold");
    datosSalida.classList.add("fs-5");
    let horaSalida = new Date(vuelo.fecha_ida).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    datosSalida.innerHTML += `<div>${horaSalida}</div>`;
    datosSalida.innerHTML += `<div>${aeropuertoSalida.id_aeropuerto}</div>`;
    salida.appendChild(datosSalida);

    let nombreAeropuerto = document.createElement("div");
    nombreAeropuerto.innerText = aeropuertoSalida.nombre;
    salida.appendChild(nombreAeropuerto);

    resumen.appendChild(salida);

    // Destino
    let destino = document.createElement("div");
    destino.classList.add("datos-aeropuerto");

    let aeropuertoDestino = await recuperarInfoAeropuerto(vuelo.id_aeropuerto_destino);

    let datosDestino = document.createElement("div");
    datosDestino.classList.add("d-flex");
    datosDestino.classList.add("gap-2");
    datosDestino.classList.add("fw-bold");
    datosDestino.classList.add("fs-5");
    datosDestino.innerHTML += `<div>${horaSalida}</div>`;
    datosDestino.innerHTML += `<div>${aeropuertoDestino.id_aeropuerto}</div>`;
    destino.appendChild(datosDestino);

    let nombreAeropuertoDestino = document.createElement("div");
    nombreAeropuertoDestino.innerText = aeropuertoDestino.nombre;
    destino.appendChild(nombreAeropuertoDestino);

    resumen.appendChild(destino);

    let duracion = document.createElement("div");
    duracion.innerText = vuelo.duracion + " minutos";

    resumen.appendChild(duracion);

    div.appendChild(resumen);
}


async function obtenerYRepresentarInfoVuelos() {
    try {
        const vueloIda = await recuperarInfoVuelo(id1);
        const vueloVuelta = await recuperarInfoVuelo(id2);
        representarInfoVuelo(vueloIda, "ida", divIda);
        representarInfoVuelo(vueloVuelta, "vuelta", divVuelta);
    } catch (error) {
        console.error(error);
    }
}

obtenerYRepresentarInfoVuelos();
