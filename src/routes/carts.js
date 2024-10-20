const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

// Ruta para obtener el carrito
router.get('/:id', cartsController.getCart);

// Ruta para agregar un producto al carrito
router.post('/add', cartsController.addProductToCart);

// Nueva ruta para crear un carrito vacío
router.post('/create', cartsController.createCart);

// Nueva ruta para ver el carrito de un usuario (redirige a /cart)
router.get('/view/:id', cartsController.getCart);

module.exports = router;
