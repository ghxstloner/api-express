const notFound = (req, res, next) => {
    res.status(404).send('Recurso no encontrado');
  };
  
  export default notFound;
  