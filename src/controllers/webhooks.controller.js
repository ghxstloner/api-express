import axios from 'axios';

const webhookUrl = 'https://webhook.site/e36760ec-9f3e-48cb-b27c-a1c43cdc65e2';

export const notifyProductUpdateDirect = async (productData) => {
  try {
    const response = await axios.post(webhookUrl, productData);
    console.log('Notificación enviada correctamente:', response.data);
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
  }
};

export default notifyProductUpdateDirect;