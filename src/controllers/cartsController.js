const Cart = require('../models/cart');
const Product = require('../models/product');

// Obtener el carrito
exports.getCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cart = await Cart.findById(cartId).populate('products.product');
        res.render('cart', { title: 'Tu Carrito', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;

    // Verificar si el cartId está presente
    if (!cartId) {
        return res.status(400).json({ message: 'Carrito no especificado' });
    }

    try {
        const cart = await Cart.findById(cartId);
        const product = await Product.findById(productId);

        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        // Buscar si el producto ya está en el carrito
        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        
        if (existingProduct) {
            existingProduct.quantity += quantity;  // Si ya está en el carrito, aumentar la cantidad
        } else {
            cart.products.push({ product: productId, quantity });  // Agregar nuevo producto al carrito
        }

        await cart.save();

        // Enviar respuesta en formato JSON
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto al carrito', error });
    }
};
// Crear un nuevo carrito
exports.createCart = async (req, res) => {
    try {
        const cart = new Cart({ products: [] });  // Crear un carrito vacío
        await cart.save();
        res.status(201).json({ cartId: cart._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear carrito', error });
    }
};
