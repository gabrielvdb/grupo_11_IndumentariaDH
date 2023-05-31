const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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

const pruebaController = require("../controllers/pruebaController.js")

/* Lista de Productos y detalle individual de producto */
router.get("/", pruebaController.productList);
router.get("/pruebaDetailProduct/:id", pruebaController.detail);

/* Get y post de creación de productos */
router.get('/create', pruebaController.create); 
router.post('/create', upload.single("productImage") ,pruebaController.processCreate);

/* Get y Post de edición de productos */
router.get('/edit/:id', pruebaController.edit);
router.post('/edit/:id', upload.single("productImage") ,pruebaController.processEdit);

/* Get y Delete de eliminación de productos */
router.get('/delete/:id', pruebaController.delete);
router.post('/delete/:id' ,pruebaController.processDelete);

/* Filtro por categorias */
router.get('/ropa', pruebaController.getProductsByCategory('ropa'));
router.get('/accesorios', pruebaController.getProductsByCategory('accesorios'));
router.get('/calzado', pruebaController.getProductsByCategory('calzado'));


module.exports = router;