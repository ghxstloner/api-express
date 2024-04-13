import Invoice from '../models/invoice/invoice.model.js';

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las facturas", error: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { orderNo, customerId, vendorId /* otros campos */ } = req.body;
    const invoice = await Invoice.create({ orderNo, customerId, vendorId /* otros campos */ });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la factura", error: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { orderNo, customerId, vendorId /* otros campos */ } = req.body;

  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    invoice.orderNo = orderNo;
    invoice.customerId = customerId;
    invoice.vendorId = vendorId;
    // Actualizar otros campos
    await invoice.save();
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la factura", error: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    await invoice.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la factura", error: error.message });
  }
};

const invoiceController = {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice
};

export default invoiceController;
