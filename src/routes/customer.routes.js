import { Router } from 'express';
import customerController from '../controllers/customer.controller.js';

const router = Router();

router.get('/', customerController.getCustomerByEmail);
router.post('/', customerController.createCustomer);

export default router;
