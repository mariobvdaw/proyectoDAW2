const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3100;

document.addEventListener('DOMContentLoaded', function () {
    const formularioRegistro = document.getElementById('formularioRegistro');
    const inputs = Array.from(formularioRegistro.querySelectorAll('input.enviable'));

    // enlace al incio de la app
    const titulo = document.getElementById('titulo')
    titulo.style.cursor = "pointer";
    titulo.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
    formularioRegistro.addEventListener('submit', function (event) {
        event.preventDefault();

        const datos = {};
        inputs.forEach(input => {
            datos[input.name] = input.value;
        });

        const url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/crear`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear usuario');
                }
                return response.json();
            })
            .then(data => {
                alert("Usuario creado correctamente");
                window.location.href = "./login.html";
            })
            .catch(error => {
                alert(error);
            });
    });
});
