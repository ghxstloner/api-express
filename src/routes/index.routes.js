import { Router } from 'express';
import productsRoutes from './products.routes.js';
import customerRoutes from './customer.routes.js';
import warehousesRoutes from './warehouses.routes.js';

const router = Router();

router.use('/products', productsRoutes);
router.use('/warehouses', warehousesRoutes);
router.use('/customers', customerRoutes);

export default router;
