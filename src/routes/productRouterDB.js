const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require('express-validator')

/* Middlewares */

const uploadFile = require('../middlewares/multerMiddlewareProduct');
const validations = require('../middlewares/validateProductMiddleware');

/* Controller */

const productControllerDB = require("../controllers/productControllerDB.js")

/* Lista de Productos y detalle individual de producto */
router.get("/", productControllerDB.productList);
router.get("/detailProductDB/:id", productControllerDB.detail);

/* Get y post de creación de productos */
router.get('/create', productControllerDB.create); 
router.post('/create', uploadFile.single("productImage"),validations,productControllerDB.processCreate);

/* Get y Post de edición de productos */
router.get('/edit/:id', productControllerDB.edit);
router.post('/edit/:id', uploadFile.single("productImage"),validations,productControllerDB.processEdit);

/* Get y Delete de eliminación de productos */
router.get('/delete/:id', productControllerDB.delete);
router.post('/delete/:id' ,productControllerDB.processDelete);

/* Filtro por categorias */
router.get('/ropa', productControllerDB.getProductsByCategory('ropa'));
router.get('/accesorios', productControllerDB.getProductsByCategory('accesorios'));
router.get('/calzado', productControllerDB.getProductsByCategory('calzado'));

/* Carrito de Compras */
router.get("/productCart", productControllerDB.productCart);


module.exports = router;