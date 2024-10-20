const express = require('express');
const router = express.Router();
const multer = require('multer');
const sellController = require('../controllers/sellController');

// Configuración de multer para la subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads'); // Ruta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para evitar conflictos
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});

// Middleware de multer para manejar la subida de imágenes
router.post('/', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Error de Multer
            return res.status(500).json({ message: `Multer error: ${err.message}` });
        } else if (err) {
            // Otro tipo de error
            return res.status(500).json({ message: `Error de servidor: ${err.message}` });
        }
        // Si no hubo errores, continúa con el procesamiento del producto
        next();
    });
}, sellController.postSellProduct);

// Mostrar formulario de venta
router.get('/', sellController.getSellForm);

module.exports = router;
