import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoseguro';

export const registrar = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [existe] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (existe.length > 0) {
      return res.status(400).json({ mensagem: 'Usuário já existe com esse email.' });
    }

    await pool.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha]);

    res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário.', erro });
  }
};

export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0 || rows[0].senha !== senha) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao fazer login.', erro });
  }
};
