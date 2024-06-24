# API - Exchanger

## Descripción
Esta API proporciona varios servicios para la gestión de productos, almacenes, clientes y pedidos. A continuación, se detallan los endpoints disponibles y sus usos.

## Endpoints

### Productos

- **Consulta Productos**
  - **Método**: GET
  - **URL**: `https://stacs.relojin.com/api/v1/products?page=1`
  - **Descripción**: Obtiene una lista de productos con paginación.

- **Consulta Productos por SKU**
  - **Método**: GET
  - **URL**: `https://stacs.relojin.com/api/v1/products?sku=Delivery1`
  - **Descripción**: Obtiene detalles de un producto específico basado en su SKU.

### Almacenes

- **Consulta Almacenes**
  - **Método**: GET
  - **URL**: `https://stacs.relojin.com/api/v1/warehouses`
  - **Descripción**: Obtiene una lista de todos los almacenes.

### Clientes

- **Crear Cliente**
  - **Método**: POST
  - **URL**: `https://stacs.relojin.com/api/v1/customer`
  - **Descripción**: Crea un nuevo cliente.
  - **Cuerpo de la Solicitud**:
    ```json
    {
        "id": "UNIQUEIDYOINER2",
        "name": "Yoiner Name",
        "email": "contacto2@codeworkingmd.com",
        "status": "ACTIVE",
        "phone": "66627875",
        "address": "Customer Country, City, ETC",
        "city": "PANAMA",
        "country": "PANAMA",
        "ruc": "8-888-8888",
        "dv": "00",
        "tipo_cliente": 2,
        "tipo_contribuyente": 1,
        "provincia": "8",
        "distrito": "8-8",
        "corregimiento": "8-8-9"
    }
    ```

- **Consulta Cliente por Email**
  - **Método**: GET
  - **URL**: `https://stacs.relojin.com/api/v1/customer?email=jairogarciab@gmail.com`
  - **Descripción**: Obtiene detalles de un cliente específico basado en su email.

### Pedidos

- **Crear Pedido**
  - **Método**: POST
  - **URL**: `https://stacs.relojin.com/api/v1/order`
  - **Descripción**: Crea un nuevo pedido.
  - **Cuerpo de la Solicitud**:
    ```json
    {
        "orderno": "002496",
        "customer": "b0cfe83a-6953-11ec-a217-55135fa621b4",
        "warehouse": "1",
        "status": "Tráfico",
        "comments": "Pedido Shopify",
        "date": "2024-05-08",
        "expiration_date": "2024-05-17",
        "sub_total": "189.95",
        "discount": "0.00",
        "taxes": "13.30",
        "total": "203.25",
        "payment_gateway_names": [
            "VISA"
        ],
        "reserve_products": true,
        "seller": "344",
        "lines": [
            {
                "id": "3271",
                "SKU": "885997124331",
                "description": "RELOJ TOMMY HILFIGER, PROVEEDOR: NEW CITY, ORIGEN: ZNLC_PTY, TIPO: PULSO",
                "name": "RELOJ TOMMY HILFIGER",
                "qty": 1,
                "price": "198.95",
                "discount": "0.00",
                "total": "198.95"
            }
        ]
    }
    ```


## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías y dependencias:

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework de servidor web para Node.js.
- **@hapi/boom**: Manejador de errores HTTP.
- **axios**: Cliente HTTP para realizar solicitudes.
- **cors**: Middleware para habilitar CORS.
- **dotenv**: Carga variables de entorno desde un archivo `.env`.
- **helmet**: Middleware para ayudar a asegurar las aplicaciones Express.
- **jsonwebtoken**: Implementación de JSON Web Tokens para autenticación.
- **mysql2**: Cliente MySQL para Node.js.
- **sequelize**: ORM para bases de datos SQL.
- **uuid**: Generador de UUIDs.
- **winston**: Biblioteca de registro de eventos (logging).
- **nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.