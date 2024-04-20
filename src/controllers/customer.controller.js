import Customer from '../models/customer.model.js';
import Country from '../models/country.model.js';
import sequelize from '../libs/sequelize.js';

export const getCustomerByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const customer = await Customer.findOne({
      where: { email },
      include: [{
        model: Country,
        as: 'countryInfo',
        attributes: ['name']
      }]
    });

    if (customer) {
      const customerData = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        status: customer.status,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        pais: customer.countryInfo.name,
        ruc: customer.ruc,
        dv: customer.dv,
        tipo_cliente: customer.tipo_cliente,
        tipo_contribuyente: customer.tipo_contribuyente,
        provincia: customer.provincia,
        distrito: customer.distrito,
        corregimiento: customer.corregimiento
      };
      res.json(customerData);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el cliente", error: error.message });
  }
};


  

  export const createCustomer = async (req, res) => {
    try {
      const { id, name, email, status, phone, address, city, country, ruc, dv, tipo_cliente, tipo_contribuyente, provincia, distrito, corregimiento } = req.body;
      const lastCustomerResult = await Customer.sequelize.query(
        "SELECT * FROM clientes ORDER BY CAST(cod_cliente AS UNSIGNED) DESC LIMIT 1",
        { type: sequelize.QueryTypes.SELECT }
      );
  
      const lastCustomer = lastCustomerResult[0];
      let lastCustomerCode = 0;
      if (lastCustomer && lastCustomer.cod_cliente) {
        lastCustomerCode = parseInt(lastCustomer.cod_cliente, 10);
      }
      const newCustomerCode = lastCustomerCode + 1;
      const newCustomerCodeFormatted = newCustomerCode.toString().padStart(9, '0');
  
      let countryId = country;
      if (isNaN(country)) { // Si no es un número, asumimos que es un nombre
        const countryInfo = await Country.findOne({ where: { name: country } });
        if (!countryInfo) {
          return res.status(404).json({ message: "País no encontrado" });
        }
        countryId = countryInfo.id;
      }
  
      const customer = await Customer.create({
        cod_cliente: newCustomerCodeFormatted,
        id: id,
        name: name,
        email: email,
        status: status,
        phone: phone,
        address: address,
        city: city,
        country: countryId,
        ruc: ruc,
        dv: dv,
        tipo_cliente: tipo_cliente,
        tipo_contribuyente: tipo_contribuyente,
        provincia: provincia,
        distrito: distrito,
        corregimiento: corregimiento,
      });
  
      res.status(201).json({
        id: customer.id, 
        status: "SUCCESS",
        errors: []
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el cliente",
        error: error.message,
        errors: [error.message]
      });
    }
  };
  
  
  

const customerController = {
    getCustomerByEmail,
    createCustomer,
};

export default customerController;
