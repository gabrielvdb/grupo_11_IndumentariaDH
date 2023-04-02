const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js")
router.get("/productCart", productController.productCart);
router.get("/productDetail", productController.productDetail);
router.get("/addProduct", productController.addProduct);
router.get("/editProduct", productController.editProduct);
router.get("/detailProduct/:id", productController.detailProduct);
router.get("/productList", productController.productList);

module.exports = router;