import sequelize from '../libs/sequelize';
import Customer from '../models/customer.model';
import Invoice from '../models/invoices/invoice.model';
import InvoiceDetail from '../models/invoices/invoiceDetails.model';
import ProductInventory from '../models/products/productInventory.model';
import NewCashRegister from '../models/cash_register/newCashRegister.model';
import CashRegisterDetail from '../models/cash_register/cashRegisterDetail.model';
import CashRegisterReceipt from '../models/cash_register/cashRegisterReceipt.model';
import KardexWarehouse from '../models/warehouses/kardexWarehouse.model';
import KardexWarehouseDetail from '../models/warehouses/kardexWarehouseDetail.model';
import crypto from 'crypto';

async function create(data) {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const customer = await Customer.findByPk(data.customer, { transaction });
    const seller = await Seller.findByPk(data.seller, { transaction });  // Asumiendo que tienes un modelo Seller

    const invoice = await Invoice.create({
      orderNo: data.orderno,
      customerId: customer.id,
      sellerId: seller.id,
      warehouseId: data.warehouse,
      status: data.status,
      comments: data.comments,
      category: data.category,
      issueDate: new Date(data.date),
      dueDate: new Date(data.expiration_date),
      subtotal: parseFloat(data.sub_total),
      discount: parseFloat(data.discount),
      taxes: parseFloat(data.taxes),
      total: parseFloat(data.total),
      paymentStatus: 'pending',  // Asumiendo un estado inicial
      currency: 'USD',  // Asumiendo moneda por defecto
      transactionDate: new Date(data.date),
    }, { transaction });

    for (const line of data.lines) {
      const product = await ProductInventory.findByPk(line.id, { transaction });
      await InvoiceDetail.create({
        invoiceId: invoice.id,
        productId: line.id,
        quantity: line.qty,
        price: line.price,
        tax: line.tax_id,
        total: line.total
      }, { transaction });

      if (data.reserve_products && product) {
        product.quantity -= line.qty;
        await product.save({ transaction });
      }
    }

    // Registro en Kardex
    const kardexRecord = await KardexWarehouse.create({
      transactionId: crypto.randomUUID(),
      type: 'sale',
      date: new Date(),
      invoiceId: invoice.id
    }, { transaction });

    // Detalles del registro Kardex
    data.productos.forEach(async item => {
      await KardexWarehouseDetail.create({
        kardexId: kardexRecord.id,
        productId: item.productId,
        quantity: item.quantity
      }, { transaction });
    });

    // Manejo de caja
    const newCashRegister = await NewCashRegister.create({
        id: cajaId,
        transactionId: invoice.id, // asumiendo que la factura tiene un ID que sirve como transacción
        date: new Date(),
        type: 'income', // Tipo de movimiento en la caja
        amount: data.totales.total_total,
        description: `Ingreso por Factura #${invoice.id}, Cliente: ${facturarA}`,
        status: 'completed', // Estado del registro en la caja
        branchId: paramGenSucursalId, // ID de la sucursal
        createdBy: data.cliente.userpos
    }, { transaction });
    
    // Registro de recibo de la caja nueva
    const cashRegisterReceipt = await CashRegisterReceipt.create({
        id: cajaNuevaReciboId,
        cashRegisterId: newCashRegister.id, // ID del registro de caja
        receiptType: 'invoice_payment', // Tipo de recibo
        receiptNumber: codRecibo, // Número de recibo
        date: new Date(),
        amount: data.totales.total_total,
        note: `Pago recibido por Factura #${invoice.id}`,
        sellerId: idVendedor,
        customerId: customer.id,
        createdBy: data.cliente.userpos
    }, { transaction });
    
    // Detalles adicionales de la caja (si es necesario)
    const cashRegisterDetail = await CashRegisterDetail.create({
        cashRegisterId: newCashRegister.id,
        paymentMethodId: data.formaPagoMonto[0].codigoFormaPago, // ID del método de pago
        transactionId: invoice.id,
        amount: data.totales.total_total,
        createdBy: data.cliente.userpos
    }, { transaction });

    // Confirmación de todos los cambios
    await transaction.commit();
    return { status: 'success', invoiceId: invoice.id };
  } catch (error) {
    await transaction.rollback();
    return { status: 'error', message: error.message };
  }
}

export default { create };
