// src/index.js
import express from 'express';
import cors from 'cors';
import deviceRoutes from './routes/deviceRoutes.js';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', deviceRoutes);

// Rota teste
app.get('/', (req, res) => {
  res.send('EcoHome Backend está rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
