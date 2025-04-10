// src/config/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // coloque a senha do seu MySQL se tiver
  database: 'ecohome_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
