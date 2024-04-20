import { Router } from 'express';
import { orderController } from '../controllers/index.js';

const router = Router();

router.get('/', orderController.getAllOrders);             
router.get('/:id', orderController.getOrderById);        
router.post('/', orderController.createOrder);            
router.put('/:id', orderController.updateOrder);          
router.delete('/:id', orderController.deleteOrder);    

export default router;
