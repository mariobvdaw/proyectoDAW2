const express = require('express');
const rutasVuelos = express.Router();

const vuelosController = require('../controllers/vuelosController');

rutasVuelos.get('/:id', vuelosController.getById);


module.exports = rutasVuelos;