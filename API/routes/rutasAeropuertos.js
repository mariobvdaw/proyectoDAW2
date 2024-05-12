const express = require('express');
const rutasAeropuertos = express.Router();

const aeropuertosController = require('../controllers/aeropuertosController');

rutasAeropuertos.get('/:id', aeropuertosController.getById);


module.exports = rutasAeropuertos;