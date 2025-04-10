// src/index.js
import express from 'express';
import cors from 'cors';
import dispositivoRoutes from './routes/deviceRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ROTAS
app.use('/dispositivos', dispositivoRoutes); // <- Aqui está o prefixo

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
