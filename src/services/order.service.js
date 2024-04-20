import db from '../libs/sequelize';
import Order from '../models/order.model'; // Asegúrate de que la ruta del modelo es correcta

const onSave = async (req, res) => {
    const {
        id, tipoFactura, idCliente, codVendedor, idSucursal, fecha, subtotal, descuentosItemPedido,
        montoItemsPedido, totalIva, total, cantidadItems, totalizarSubtotal, totalizarDescuentoParcial,
        totalizarTotalOperacion, totalizarPDescuentoGlobal, totalizarDescuentoGlobal, totalizarBaseImponible,
        totalizarMontoIva, totalizarTotalGeneral, totalizarTotalRetencion, idFormaPago, validarStock,
        facturarA, rifCliente, direccion, telefono, paisId, facturaDetalleFormaPago
    } = req.body;

    const codEstatus = procesar === 1 ? '2' : '1';

    // Calcular el subtotal FOB y actualizar los totales
    const subtotalFob = transpasoSalida + transporte + empaques + seguro + flete + comisiones + manejo + otros;
    subtotal += subtotalFob;
    totalizarBaseImponible += subtotalFob;
    totalizarTotalGeneral += subtotalFob;

    // Condición si se necesita calcular un monto específico para el control de crédito
    let totalizarMontoCxc = formapagoDetalle.totalizarMontoCxc || 0;

    // Actualizar datos del cliente si hay cambios significativos
    const { direccion: clienteDireccion, telefono: clienteTelefono, pais: clientePais } = await db.models.Cliente.findByPk(idCliente);
    let direccionFinal = facturarARucOriginal !== facturarARuc ? direccion : clienteDireccion;
    let telefonoFinal = facturarARucOriginal !== facturarARuc ? telefono : clienteTelefono;
    let paisFinal = facturarARucOriginal !== facturarARuc ? paisId : clientePais;


    try {
        const transaction = await db.transaction();

        // Verificación de stock si es necesario
        if (validarStock.toUpperCase() === "SI") {
            const itemsPromocion = req.body.detalle.filter(item => item._itemPromocion === 'combo');
            for (let i = 0; i < req.body.detalle.length; i++) {
                if (itemsPromocion.includes(req.body.detalle[i])) {
                    continue; // Si el item es parte de una promoción tipo 'combo', se salta la verificación de stock
                }

                // Aquí deberías tener lógica para verificar el stock real desde la base de datos
                const stockComprometido = 0; // Esta variable debe ser calculada
                const stockSumar = id ? 0 : 0; // Esta variable debe ser calculada según si es una edición o una nueva inserción
                const stockDisponible = 100; // Suponemos que hay 100 unidades disponibles como ejemplo

                if ((req.body.detalle[i]._itemCantidadTotal + stockComprometido) > (stockDisponible + stockSumar)) {
                    await transaction.rollback();
                    return res.status(400).json({
                        success: false,
                        message: `La cantidad ingresada para el item N° ${i + 1} excede la disponibilidad.`
                    });
                }
            }
        }

        // Continuar con la creación o actualización del pedido
        const codEstatus = procesar === 1 ? '2' : '1';

        // Calcular el subtotal FOB y actualizar los totales
        const subtotalFob = transpasoSalida + transporte + empaques + seguro + flete + comisiones + manejo + otros;
        subtotal += subtotalFob;
        totalizarBaseImponible += subtotalFob;
        totalizarTotalGeneral += subtotalFob;

        // Condición si se necesita calcular un monto específico para el control de crédito
        let totalizarMontoCxc = formapagoDetalle.totalizarMontoCxc || 0;

        // Actualizar datos del cliente si hay cambios significativos
        const { direccion: clienteDireccion, telefono: clienteTelefono, pais: clientePais } = await db.models.Cliente.findByPk(idCliente);
        let direccionFinal = facturarARucOriginal !== facturarARuc ? direccion : clienteDireccion;
        let telefonoFinal = facturarARucOriginal !== facturarARuc ? telefono : clienteTelefono;
        let paisFinal = facturarARucOriginal !== facturarARuc ? paisId : clientePais;

        const updatedOrder = await db.transaction(async transaction => {
            if (id) {
                // Actualización del pedido existente
                return await Order.update({
                    tipoFactura, idCliente, codVendedor, idSucursal, fecha,
                    subtotal, descuentosItemPedido, montoItemsPedido, totalIva, total,
                    cantidadItems, totalizarSubtotal, totalizarDescuentoParcial, totalizarTotalOperacion,
                    totalizarPDescuentoGlobal, totalizarDescuentoGlobal, totalizarBaseImponible,
                    totalizarMontoIva, totalizarTotalGeneral, totalizarTotalRetencion,
                    codEstatus, direccion: direccionFinal, telefono: telefonoFinal, paisId: paisFinal
                }, { where: { id }, transaction });
            } else {
                // Creación de un nuevo pedido
                return await Order.create({
                    tipoFactura, idCliente, codVendedor, idSucursal, fecha,
                    subtotal, descuentosItemPedido, montoItemsPedido, totalIva, total,
                    cantidadItems, totalizarSubtotal, totalizarDescuentoParcial, totalizarTotalOperacion,
                    totalizarPDescuentoGlobal, totalizarDescuentoGlobal, totalizarBaseImponible,
                    totalizarMontoIva, totalizarTotalGeneral, totalizarTotalRetencion,
                    codEstatus, direccion: direccionFinal, telefono: telefonoFinal, paisId: paisFinal
                }, { transaction });
            }
        });
    
        return res.status(200).json({
            success: true,
            message: 'Pedido procesado correctamente',
            order: updatedOrder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al procesar el pedido',
            error: error.message
        });
    }
};
