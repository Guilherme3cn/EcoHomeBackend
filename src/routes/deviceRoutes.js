// deviceRoutes.js
// src/routes/deviceRoutes.js
import express from 'express';
import {
    cadastrarDispositivo,
    listarDispositivos,
    atualizarDispositivo,
    deletarDispositivo,
    buscarDispositivo
  } from '../controllers/deviceController.js';

  const router = express.Router();

  
  router.get('/', listarDispositivos);
  router.get('/:id', buscarDispositivo);
  router.post('/', cadastrarDispositivo);
  router.put('/:id', atualizarDispositivo);
  router.delete('/:id', deletarDispositivo);
  






export default router;
