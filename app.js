const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const config = require('./config.js')
const app = express();
const PORT = config.PORT;

app.use(cors());
app.use(express.json());

//Pool de conexiones a MySQL
const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get('/config', (req,res)=>{
  res.json({
    HOST: config.HOST,
    PORT: config.PORT,
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'El nombre de usuario y contraseña son obligatorios' });
  }

  const query = 'SELECT id, password FROM usuarios WHERE username = ?';
  pool.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Error al verificar el usuario:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = results[0];
    try {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      res.json({ message: 'Inicio de sesión exitoso', userId: user.id });
    } catch (err) {
      console.error('Error al comparar las contraseñas:', err);
      res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
  });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'El nombre de usuario y contraseña son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    pool.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'El usuario ya existe' });
        }
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ message: 'Error del servidor' });
      }

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).json({ message: 'Error al procesar el registro' });
  }
});

app.post('/guardar-melodia', (req, res) => {
  try {
    const { userId, nombre, notas } = req.body;

    if (!userId || !nombre || !notas || !Array.isArray(notas)) {
      return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
    }

    const query = 'INSERT INTO melodias (user_Id, nombre, nota1, nota2, nota3, nota4, nota5) VALUES (?, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [userId, nombre, ...notas], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar la melodía' });
      }
      res.status(200).json({ message: 'Melodía guardada exitosamente' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.get('/melodias/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT id, nombre, nota1, nota2, nota3, nota4, nota5
    FROM melodias
    WHERE user_id = ?
  `;

  pool.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las melodías' });
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${config.HOST}:${PORT}`);
});