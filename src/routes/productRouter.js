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

const productController = require("../controllers/productController.js")

/* Lista de productos */
router.get("/", productController.productList);

/* Detalle de un producto */
router.get("/detailProduct/:id", productController.detailProduct);

/* Detalle de producto (Aldana) */
router.get("/productDetail", productController.productDetail);

/* Crear un producto */
router.get("/addProduct", productController.addProduct);
router.post("/", upload.single("productImage") ,productController.saveProduct);

/* Editar un producto */
router.get("/editProduct/:id", productController.editProduct);
router.patch("/editProduct/:id", upload.single("productImage") ,productController.updateProduct);

/* Eliminar un producto */
router.delete("/delete/:id", productController.deleteProduct);

/* Carrito de Compras */
router.get("/productCart", productController.productCart);

module.exports = router;