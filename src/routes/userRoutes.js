import express from 'express';
import { registrar, loginUser } from '../controllers/userController.js';


const router = express.Router();

router.post('/registrar', registrar);g
router.post('/login', loginUser);

export default router;
