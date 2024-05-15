import { Router } from 'express';
import { productsController } from '../controllers/index.js';

const router = Router();

router.get('/', productsController.getProducts);
// router.post('/', productsController.createProducts);
// router.put('/:id', productsController.updateProducts); 
// router.delete('/:id', productsController.deleteProducts); 

export default router;