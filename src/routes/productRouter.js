const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js")

/* Lista de productos */
router.get("/", productController.productList);

/* Detalle de un producto */
router.get("/detailProduct/:id", productController.detailProduct);

/* Detalle de producto (Aldana) */
router.get("/productDetail", productController.productDetail);

/* Crear un producto */
router.get("/addProduct", productController.addProduct);
router.post("/", productController.saveProduct);

/* Editar un producto */
router.get("/editProduct", productController.editProduct);
/* -->>>> router.patch("/editar/:numeroProducto", productController.update); <<<<-- */

/* Eliminar un producto */
/* -->>>> router.delete("/eliminar/:numeroProducto", productController.delete); <<<<-- */


router.get("/productCart", productController.productCart);






module.exports = router;