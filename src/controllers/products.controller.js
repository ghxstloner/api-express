import Product from '../models/products/product.model.js'; 
import WarehouseStock from '../models/warehouses/warehouseStock.model.js';
import Warehouse from '../models/warehouses/warehouse.model.js';
import sequelize from '../libs/sequelize.js';
import { Op } from 'sequelize';

export const getProducts = async (req, res) => {
    const { page = 1, sku } = req.query;
    const limit = 50;
    const offset = (page - 1) * limit;

    try {
        const allowedWarehouses = await sequelize.query(
            "SELECT cod_almacen FROM exchanger_parametros_producto",
            { type: sequelize.QueryTypes.SELECT }
        );
        const warehouseIds = allowedWarehouses[0].cod_almacen.split(',');

        if (warehouseIds.length === 0) {
            return res.status(404).json({ message: "No hay almacenes configurados definidos." });
        }

        const whereClause = {
            [Op.or]: [
                { visible_web: 'T' },
                { visible_web: { [Op.is]: null } },
                {
                    [Op.and]: [
                        { visible_web: 'F' },
                        { 
                            [Op.or]: [
                                { unidad_empaque: 'SERV' },
                                { unidad_o_empaque: 'SERV' }
                            ]
                        }
                    ]
                }
            ]
        };

        if (sku) {
            whereClause.sku = sku;
        }

        let products = await Product.findAll({
            where: whereClause,
            include: [{
                model: WarehouseStock,
                as: 'WarehouseStocks',
                attributes: ['codAlmacen', 'cantidad'],
                include: [{
                    model: Warehouse,
                    as: 'Warehouse',
                    attributes: ['name']
                }],
                where: {
                    codAlmacen: warehouseIds
                },
                required: false
            }],
            limit,
            offset
        });

        if (products.length === 0 && sku) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        products = products.map(product => {
            const plainProduct = product.get({ plain: true });
            const stock = plainProduct.WarehouseStocks.map(stock => ({
                id: stock.codAlmacen,
                warehouse: stock.Warehouse ? stock.Warehouse.name : 'Unknown',
                available: stock.cantidad
            }));
            delete plainProduct.WarehouseStocks;
            plainProduct.stock = stock;
            return plainProduct;
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los productos",
            error: error.message
        });
    }
};

export const createProducts = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto",
            error: error.message
        });
    }
};

export const updateProducts = async (req, res) => {
    const { id } = req.params; 

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.update(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto",
            error: error.message
        });
    }
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.destroy();
        res.status(204).send();  // 204 No Content
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto",
            error: error.message
        });
    }
};

const productsController = {
    getProducts,
    createProducts,
    // updateProducts,
    // deleteProducts
};

export default productsController;
