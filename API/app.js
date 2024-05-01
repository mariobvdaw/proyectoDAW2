
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

const rutasVuelos = require('./routes/rutasVuelos');
const rutasUsuarios = require('./routes/rutasUsuarios');

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());

app.use(session({
    secret: 'clave',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000 }
}));


app.use('/vuelos', rutasVuelos);
app.use('/usuarios', rutasUsuarios);



const PUERTO = process.env.PORT || 3100;

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
