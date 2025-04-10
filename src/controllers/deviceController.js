// deviceController.js
import pool from '../config/db.js';

export const registerDevice = async (req, res) => {
  const { name, icon, consumption } = req.body;

  if (!name || !icon || !consumption) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO devices (name, icon, consumption) VALUES (?, ?, ?)',
      [name, icon, consumption]
    );

    res.status(201).json({
      message: 'Dispositivo cadastrado com sucesso!',
      device: {
        id: result.insertId,
        name,
        icon,
        consumption
      }
    });
  } catch (error) {
    console.error('Erro ao salvar dispositivo:', error);
    res.status(500).json({ message: 'Erro ao salvar dispositivo.' });
  }
};
