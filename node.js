const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'series_comments'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

app.post('/api/comments', (req, res) => {
    const { comment, episode, season } = req.body;
    const sql = 'INSERT INTO comments (comment, episode, season) VALUES (?, ?, ?)';
    db.query(sql, [comment, episode, season], (err, result) => {
        if (err) {
            res.status(500).json({ success: false });
        } else {
            res.status(200).json({ success: true });
        }
    });
});

app.get('/api/comments', (req, res) => {
    const sql = 'SELECT * FROM comments ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});