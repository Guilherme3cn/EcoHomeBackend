// deviceRoutes.js
import express from 'express';
import { registerDevice } from '../controllers/deviceController.js';

const router = express.Router();

router.post('/devices', registerDevice);

export default router;
