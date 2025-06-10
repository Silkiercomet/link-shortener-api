// 1. Importaciones
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
// Conexión a la base de datos MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
}

// 2. Inicializaciones
const app = express();
dotenv.config(); // Carga las variables de entorno

// 3. Middlewares
app.use(cors()); // Permite peticiones de otros orígenes
app.use(express.json()); // Permite entender los bodies en formato JSON
app.use(express.static('public')); // (Opcional) Para servir archivos estáticos

// 4. Rutas
app.get('/', (req, res) => {
    res.json({ message: 'API del Acortador de URLs funcionando correctamente' });
});

// 5. Iniciar Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});