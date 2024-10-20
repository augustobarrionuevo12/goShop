const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas de productos
router.get('/', productsController.getProducts); // Obtener todos los productos
router.post('/', productsController.addProduct); // Agregar un nuevo producto

module.exports = router;
