const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3100;

function comprobarSesion() {
    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/getUsuario`;
    fetch(url, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }
            return response.json();
        })
        .then(data => {
            // mostar la informacion del usuario y el boton de cerrar sesion
            let bloqueSesion = document.getElementById("bloqueSesion");
            let parrafoBienvenida = document.getElementById("bienvenida");
            bloqueSesion.classList.remove("d-none");
            parrafoBienvenida.innerText = `Bienvenido ${data.usuario.nombre}`;
            document.getElementById('btn-cerrarSesion').addEventListener('click', cerrarSesion);
            // console.log('Usuario recuperado:', data.usuario);

            let enlaceInicio = document.getElementById("enlaceInicio");
            enlaceInicio.classList.add("d-none");
        });
}

function cerrarSesion() {
    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/cerrarSesion`;

    fetch(url, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = window.location.href;
        });
}
export { comprobarSesion, cerrarSesion };