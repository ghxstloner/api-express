import { Router } from 'express';
import { orderController } from '../controllers/index.js';

const router = Router();

router.post('/', orderController.createOrder);            

export default router;
