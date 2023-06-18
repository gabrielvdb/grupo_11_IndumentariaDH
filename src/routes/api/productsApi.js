const express = require('express');
const router = express.Router();
const productsApiControllers = require('../../controllers/api/productsApiControllers.js');

router.get('/', productsApiControllers.listProducts);

router.get('/:id', productsApiControllers.detalleProducto);

module.exports = router;