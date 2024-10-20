const multer = require('multer');
const path = require('path');

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads')); // Ruta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});

// Establecer el límite de tamaño del archivo (opcional)
const upload = multer({ 
    storage,
    limits: { fileSize: 1024 * 1024 * 5 } // Límite de 5MB
});

module.exports = upload;
