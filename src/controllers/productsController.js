const Product = require('../models/product'); // Modelo del producto

// Obtener todos los productos y renderizar la vista
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Productos obtenidos:', products); // Para depuración
        res.render('products', { title: 'Productos Disponibles', products }); // Renderiza la vista con los productos
    } catch (error) {
        console.error('Error al obtener productos:', error); // Para depuración
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
    const { title, description, price, category, brand, image } = req.body; // Campos del formulario de producto
    try {
        const product = new Product({
            title,
            description,
            price,
            category,
            brand,
            image, // Guardar el link de la imagen
        });

        await product.save(); // Guarda el producto en la base de datos
        console.log('Producto agregado:', product); // Para depuración
        res.redirect('/products'); // Redirige a la lista de productos
    } catch (error) {
        console.error('Error al agregar producto:', error); // Para depuración
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
};
