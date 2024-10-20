const Product = require('../models/product');

exports.getSellForm = (req, res) => {
    res.render('sell', { title: 'Vender un Producto' });
};

exports.postSellProduct = async (req, res) => {
    const { title, description, price, category, brand } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Guardar la ruta de la imagen

    const product = new Product({
        title,
        description,
        price,
        category,
        brand,
        image // Guardar la imagen si fue subida
    });

    try {
        await product.save();
        res.redirect('/products'); // Redirigir a la lista de productos si fue exitoso
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        res.status(500).render('sell', {
            title: 'Vender un Producto',
            errorMessage: 'Hubo un error al publicar el producto. Por favor, inténtalo de nuevo.'
        });
    }
};
