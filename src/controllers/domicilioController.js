const Domicilio = require('../models/Domicilio');

// GET todos los domicilios
exports.getAllDomicilios = async (req, res) => {
  try {
    const domicilios = await Domicilio.find();
    res.json(domicilios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET domicilios por estado
exports.getDomiciliosByEstado = async (req, res) => {
  try {
    const domicilios = await Domicilio.find({ estado: req.params.estado });
    res.json(domicilios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET domicilio por ID
exports.getDomicilioById = async (req, res) => {
  try {
    const domicilio = await Domicilio.findById(req.params.id);
    if (!domicilio) return res.status(404).json({ message: 'Domicilio no encontrado' });
    res.json(domicilio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST nuevo domicilio
exports.createDomicilio = async (req, res) => {
  const { cliente, direccion, telefono, ubicacionCliente } = req.body;
  try {
    const nuevoDomicilio = new Domicilio({
      cliente,
      direccion,
      telefono,
      ubicacionCliente
    });
    await nuevoDomicilio.save();
    res.status(201).json(nuevoDomicilio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT actualizar domicilio a "Aceptado" con el profesional
exports.aceptarDomicilio = async (req, res) => {
  const { profesional, ubicacionProfesional } = req.body;
  try {
    const domicilio = await Domicilio.findById(req.params.id);
    if (!domicilio) return res.status(404).json({ message: 'Domicilio no encontrado' });

    domicilio.profesional = profesional;
    domicilio.ubicacionProfesional = ubicacionProfesional;
    domicilio.estado = 'Aceptado';

    await domicilio.save();
    res.json(domicilio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT cancelar domicilio
exports.cancelarDomicilio = async (req, res) => {
  try {
    const domicilio = await Domicilio.findById(req.params.id);
    if (!domicilio) return res.status(404).json({ message: 'Domicilio no encontrado' });

    domicilio.estado = 'Cancelado';
    domicilio.fin = Date.now();

    await domicilio.save();
    res.json(domicilio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT completar domicilio
exports.completarDomicilio = async (req, res) => {
  try {
    const domicilio = await Domicilio.findById(req.params.id);
    if (!domicilio) return res.status(404).json({ message: 'Domicilio no encontrado' });

    domicilio.estado = 'Completado';
    domicilio.fin = Date.now();

    await domicilio.save();
    res.json(domicilio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT actualizar solo la ubicación del profesional
exports.actualizarUbicacionProfesional = async (req, res) => {
  const { ubicacionProfesional } = req.body;
  try {
    const domicilio = await Domicilio.findById(req.params.id);
    if (!domicilio) return res.status(404).json({ message: 'Domicilio no encontrado' });

    domicilio.ubicacionProfesional = ubicacionProfesional;

    await domicilio.save();
    res.json(domicilio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ubicación del profesional por ID
exports.getUbicacionProfesional = async (req, res) => {
  try {
    const domicilio = await Domicilio.findById(req.params.id);
    if (!domicilio) return res.status(404).json({ message: 'Domicilio no encontrado' });
    res.json(domicilio.ubicacionProfesional);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
