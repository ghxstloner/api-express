// index.routes.js
import { Router } from 'express';
import authenticateToken from '../middlewares/auth.js'; // Asegúrate de que la ruta es correcta
import productsRoutes from './products.routes.js';
import customerRoutes from './customer.routes.js';
import warehousesRoutes from './warehouses.routes.js';
import orderRoutes from './order.routes.js'

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authenticateToken);

// Definir rutas específicas
router.use('/products', productsRoutes);
router.use('/warehouses', warehousesRoutes);
router.use('/customer', customerRoutes);
router.use('/order', orderRoutes);

export default router;
