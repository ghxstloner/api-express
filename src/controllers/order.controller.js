import Order from '../models/orders/order.model.js';

class OrderController {
    // Obtener todos los pedidos
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll();
            res.json(orders);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Obtener un pedido por ID
    async getOrderById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (order) {
                res.json(order);
            } else {
                res.status(404).send('Order not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Crear un nuevo pedido
    async createOrder(req, res) {
        try {
            const newOrder = await Order.create(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // Actualizar un pedido existente
    async updateOrder(req, res) {
        try {
            const updatedOrder = await Order.update(req.body, {
                where: { id_pedido: req.params.id }
            });
            if (updatedOrder) {
                res.json({ message: 'Order updated successfully' });
            } else {
                res.status(404).send('Order not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // Eliminar un pedido
    async deleteOrder(req, res) {
        try {
            const result = await Order.destroy({
                where: { id_pedido: req.params.id }
            });
            if (result) {
                res.json({ message: 'Order deleted successfully' });
            } else {
                res.status(404).send('Order not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new OrderController();
