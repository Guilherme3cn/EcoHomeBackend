import express from 'express';
import { registrar, loginUser } from '../controllers/userController.js';


const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', loginUser);

export default router;
