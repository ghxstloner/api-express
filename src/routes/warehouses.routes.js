import { Router } from 'express';
import wareHouseController from '../controllers/warehouses.controller.js';

const router = Router();

router.get('/', wareHouseController.getWarehouses);
router.post('/', wareHouseController.createWarehouse);
router.put('/:cod_almacen', wareHouseController.updateWarehouse);
router.delete('/:cod_almacen', wareHouseController.deleteWarehouse);

export default router;
