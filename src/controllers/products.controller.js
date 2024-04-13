import Product from '../models/products/product.model.js'; 
export const getProducts = async (req, res) => {
    const { page = 1, sku } = req.query;
    const limit = 50;
    const offset = (page - 1) * limit;

    try {
        const whereClause = {};
        if (sku) {
            whereClause.cod_item = sku;
        }

        const products = await Product.findAll({
            where: whereClause,
            limit,
            offset,
            order: [['fecha_creacion', 'DESC']]
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
    updateProducts,
    deleteProducts
};

export default productsController;
