
const express = require('express');
const app = express();
const cors = require('cors');


const rutasVuelos = require('./routes/rutasVuelos');

app.use(cors());
app.use(express.json());

app.use('/vuelos', rutasVuelos);



const PUERTO = process.env.PORT || 3100;

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
