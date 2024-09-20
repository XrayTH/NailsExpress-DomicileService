const mongoose = require('mongoose');

const ubicacionSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: false
  },
  lng: {
    type: Number,
    required: false
  }
});

const domicilioSchema = new mongoose.Schema({
  estado: {
    type: String,
    enum: ['Solicitado', 'Aceptado', 'Cancelado', 'Completado'],
    default: 'Solicitado'
  },
  cliente: {
    type: String,
    required: true
  },
  profesional: {
    type: String,
    default: null
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  ubicacionCliente: {
    type: ubicacionSchema,
    required: true
  },
  ubicacionProfesional: {
    type: ubicacionSchema,
    default: null
  },
  inicio: {
    type: Date,
    default: Date.now
  },
  fin: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Domicilio', domicilioSchema);
