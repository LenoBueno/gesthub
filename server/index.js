
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Criar tabela se não existir
pool.query(`
  CREATE TABLE IF NOT EXISTS notas_fiscais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(255) NOT NULL,
    numeroNota VARCHAR(50) NOT NULL,
    dataEmissao DATETIME NOT NULL,
    dataEnvioMensagem DATETIME NOT NULL,
    contato VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL
  )
`);

// Rotas
app.get('/notas', async (req, res) => {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM notas_fiscais');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/notas', async (req, res) => {
  try {
    const [result] = await pool.promise().query(
      'INSERT INTO notas_fiscais SET ?',
      req.body
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/notas/:id', async (req, res) => {
  try {
    await pool.promise().query(
      'UPDATE notas_fiscais SET ? WHERE id = ?',
      [req.body, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/notas/:id', async (req, res) => {
  try {
    await pool.promise().query(
      'DELETE FROM notas_fiscais WHERE id = ?',
      [req.params.id]
    );
    res.json({ message: 'Nota fiscal deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
