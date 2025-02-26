const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Arigames290607',
    database: 'series_comments'
});

db.connect((err) => {
    if (err) throw err;

    // Verificar si la tabla existe
    db.query("SHOW TABLES LIKE 'comments'", (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log('La tabla "comments" existe.');

            // Ver el contenido de la tabla
            db.query('SELECT * FROM comments', (err, rows) => {
                if (err) throw err;
                console.log('Contenido de la tabla:', rows);
            });
        } else {
            console.log('La tabla "comments" no existe.');
        }
    });
});