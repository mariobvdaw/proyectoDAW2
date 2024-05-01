const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3100;

// enlace al incio de la app
const titulo = document.getElementById('titulo')
titulo.style.cursor = "pointer";
titulo.addEventListener('click', () => {
    window.location.href = '../index.html';
});

document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault();
    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/login`;

    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;

    const datos = {
        email: email,
        contrasena: contrasena
    };
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos),

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            window.location.href = "../index.html"
        })
        .catch(error => {
            console.error(error);
        });
});