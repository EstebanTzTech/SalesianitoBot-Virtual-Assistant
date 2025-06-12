const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'asistente_virtual'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener el horario de un semestre específico
app.get('/horario/:semestre', (req, res) => {
  const semestre = req.params.semestre;
  const query = `
    SELECT s.semestre, s.paralelo, s.aula, s.turno, h.dia, h.hora_inicio, h.hora_fin, h.materia, h.codigo, h.docente
    FROM semestres s
    JOIN horarios h ON s.id = h.semestre_id
    WHERE s.semestre = ?
    ORDER BY h.dia, h.hora_inicio;
  `;

  db.query(query, [semestre.toUpperCase()], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});