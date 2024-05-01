import { comprobarSesion } from './sesion.js';

comprobarSesion();

const sliderDuracion = document.getElementById('duracion');
const sliderPrecio = document.getElementById('precio');
const spansSlider = document.querySelectorAll('.span-slider');
const btnFiltros = document.getElementById('btn-filtros');

// recogida de parametros
const parametros = new URLSearchParams(window.location.search)
const partida = parametros.get("partida");
const destino = parametros.get("destino");
const ida = parametros.get("ida");
const vuelta = parametros.get("vuelta");

// enlace al incio de la app
const titulo = document.getElementById('titulo')
titulo.style.cursor = "pointer";
titulo.addEventListener('click', () => {
    window.location.href = '../index.html';
});

document.getElementById('viaje').innerText = `${partida} - ${destino}`;
document.getElementById('ida').innerText = new Date(ida).toLocaleDateString();
document.getElementById('vuelta').innerText = new Date(vuelta).toLocaleDateString();

// sliders
sliderDuracion.addEventListener('change', () => {
    spansSlider[0].innerText = sliderDuracion.value;
})
sliderPrecio.addEventListener('change', () => {
    spansSlider[1].innerText = sliderPrecio.value;
})

// mostrar y ocultar aside
btnFiltros.addEventListener('click', () => {
    const aside = document.getElementsByClassName("aside")[0];
    aside.classList.toggle("aside-completo");
    const btnCerrarAside = document.createElement("button");
    btnCerrarAside.innerText = "X";
    btnCerrarAside.classList.add("btn-cerrar-aside");
    btnCerrarAside.addEventListener('click', function () {
        aside.classList.remove('aside-completo');
        btnCerrarAside.parentElement.removeChild(btnCerrarAside);
    });
    document.body.appendChild(btnCerrarAside);
});

