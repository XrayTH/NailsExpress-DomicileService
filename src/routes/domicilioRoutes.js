const express = require('express');
const router = express.Router();
const domicilioController = require('../controllers/domicilioController');

// Rutas para domicilios
router.get('/', domicilioController.getAllDomicilios);
router.get('/estado/:estado', domicilioController.getDomiciliosByEstado);
router.get('/:id', domicilioController.getDomicilioById);
router.post('/', domicilioController.createDomicilio);
router.put('/:id/aceptar', domicilioController.aceptarDomicilio);
router.put('/:id/cancelar', domicilioController.cancelarDomicilio);
router.put('/:id/completar', domicilioController.completarDomicilio);
router.put('/:id/ubicacionProfesional', domicilioController.actualizarUbicacionProfesional);
router.get('/:id/ubicacionProfesional', domicilioController.getUbicacionProfesional);

module.exports = router;
