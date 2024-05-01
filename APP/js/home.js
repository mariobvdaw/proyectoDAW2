import { comprobarSesion } from './sesion.js';

comprobarSesion();

const cardsInputs = document.querySelectorAll('.card-input');
const btnIntercambio = document.getElementById('btn-intercambio');
// const btnBuscar = document.getElementById('buscar-vuelo');
const formulario = document.forms.filtros;
const hoy = new Date().toISOString().split('T')[0];

// enlace al incio de la app
const titulo = document.getElementById('titulo')
titulo.style.cursor="pointer";
titulo.addEventListener('click', () => {
    window.location.href = './index.html';
});


// filtrar fecha actual
function mayorHoy(input) {
    input.setAttribute('min', hoy);
}
mayorHoy(formulario.fecha_ida);
mayorHoy(formulario.fecha_vuelta);

// boton intercambio
btnIntercambio.addEventListener('click', () => {
    let v1 = cardsInputs[0].children[1].value;
    cardsInputs[0].children[1].value = cardsInputs[1].children[1].value;
    cardsInputs[1].children[1].value = v1;
})

// validacion formulario filtros
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    if (formulario.partida.value == "") {
        formulario.partida.focus();
        return;
    }
    if (formulario.destino.value == "") {
        formulario.destino.focus();
        return;
    }
    if (formulario.fecha_ida.value < hoy) {
        formulario.fecha_ida.focus();
        return;
    }
    if (formulario.fecha_vuelta.value < hoy || formulario.fecha_vuelta.value < formulario.fecha_ida.value) {
        formulario.fecha_vuelta.focus();
        return;
    }

    window.location = `./html/vuelos.html?partida=${formulario.partida.value}&destino=${formulario.destino.value}&ida=${formulario.fecha_ida.value}&vuelta=${formulario.fecha_vuelta.value}`;


});
