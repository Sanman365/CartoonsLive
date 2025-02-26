const express = require('express');
const mysql = require('mysql2'); // Usamos mysql2 para evitar problemas de autenticación
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para parsear JSON y habilitar CORS
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Arigames290607', // Tu contraseña de MySQL
    database: 'series_comments' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para manejar el envío del mensaje
app.post('/submit-message', (req, res) => {
    const { message } = req.body;

    const sql = 'INSERT INTO comments2 (comment) VALUES (?)'; // Solo insertamos el mensaje
    db.query(sql, [message], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            res.status(500).json({ success: false });
        } else {
            console.log('Mensaje insertado con éxito');
            res.status(200).json({ success: true });
        }
    });
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://http://localhost:8000/Documents/CartoonLive/CartoonsLive/prueba.html:${port}`);
});