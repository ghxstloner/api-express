import OrderService from '../services/order.service.js';
import { randomUUID } from 'crypto';
import winston from 'winston';

class OrderController {
  async createOrder(req, res) {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ format: winston.format.simple() })
      ]
    });
    try {
      const data = req.body;
      const idPedido = randomUUID();

      if (!data.orderno || !data.customer || !data.seller || !data.warehouse || !data.date || !data.sub_total || !data.taxes || !data.total || !data.lines || data.lines.length === 0) {
        logger.error('Validation failed', { data });
        return res.status(400).json({
          message: "Falta información esencial para crear el pedido."
        });
      }

      for (const line of data.lines) {
        if (!line.id || line.qty === undefined || !line.description || line.price === undefined || line.discount === undefined || line.total === undefined) {
          logger.error('Validation failed', { line });
          return res.status(400).json({
            message: "Falta información en los detalles del pedido."
          });
        }
      }

      const orderData = {
        id_pedido: idPedido,
        cod_pedido: data.orderno,
        id_cliente: data.customer,
        cod_vendedor: data.seller,
        id_sucursal: data.warehouse,
        fechaPedido: new Date(data.date),
        fechaVencimiento: new Date(data.expiration_date),
        subtotal: parseFloat(data.sub_total),
        ivaTotalPedido: parseFloat(data.taxes),
        TotalTotalPedido: parseFloat(data.total),
        cantidad_items: data.lines.length,
        validar_stock: data.reserve_products ? "SI" : "NO",
        detalle: data.lines.map(line => ({
          id_detalle_pedido: randomUUID(),
          id_pedido: idPedido,
          id_item: line.id,
          cantidad: line.qty,
          descripcion: line.description,
          precio_sin_iva: line.price,
          descuento: line.discount,
          total_con_iva: line.total
        })),
        estado: data.status === "ACTIVE" ? 1 : 0,
        metodo_pago: data.payment_gateway_names.join(', '),
        observacion: data.comments,
        usuario_creacion: 'UserID',  
        fecha_creacion: new Date()
      };

      const result = await OrderService.create(orderData);
      if (result.success) {
        res.status(201).json({
          id: result.id || idPedido,
          status: "SUCCESS",
          errors: [] 
        });      
      } else {
        logger.error('Failed to create order:', { orderData, result }); 
        res.status(400).json({
          id: result.id || idPedido, 
          status: "FAILED",
          errors: [result]
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  }
}

export default new OrderController();
