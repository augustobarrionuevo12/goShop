const express = require('express'); 
const path = require('path');
const { create } = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer'); // Agregar multer

// Cargar variables de entorno
dotenv.config();

// Rutas
const productRoutes = require('./src/routes/products');
const cartRoutes = require('./src/routes/carts');
const sellRoutes = require('./src/routes/sell');

// Inicializar Express
const app = express();

// Conectar a la base de datos
const connectDB = require('./src/config/db');
connectDB();

// Configurar opción strictQuery
mongoose.set('strictQuery', false); // Cambia a true si deseas evitar consultas estrictas

// Configurar Handlebars como motor de plantillas
const hbs = create({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'src', 'views', 'partials'),
  helpers: {
    multiply: (quantity, price) => quantity * price,
    calculateCartTotal: (products) => {
      let total = 0;
      products.forEach(item => {
        total += item.quantity * item.product.price;
      });
      return total.toFixed(2);
    }
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});


app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'public')));
// Agregar middleware para servir archivos subidos
app.use('/uploads', express.static(path.join(__dirname, 'src', 'public', 'uploads'))); // Esta línea sirve los archivos de la carpeta uploads

// Middlewares para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/sell', sellRoutes); // Ahora sin necesidad de especificar multer aquí, lo hacemos en la ruta específica

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', { title: 'Inicio' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
