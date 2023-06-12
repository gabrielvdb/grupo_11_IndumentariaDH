const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

/* Middlewares */

const validations = require('../middlewares/validateProductMiddleware');

/* configuración de Multer */

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/products")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

const productControllerDB = require("../controllers/productControllerDB.js")

/* Lista de Productos y detalle individual de producto */
router.get("/", productControllerDB.productList);
router.get("/detailProductDB/:id", productControllerDB.detail);

/* Get y post de creación de productos */
router.get('/create', productControllerDB.create); 
router.post('/create', upload.single("productImage") ,productControllerDB.processCreate);

/* Get y Post de edición de productos */
router.get('/edit/:id', productControllerDB.edit);
router.post('/edit/:id', upload.single("productImage"),productControllerDB.processEdit);

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