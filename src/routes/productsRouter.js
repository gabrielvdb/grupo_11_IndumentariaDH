const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js")
router.get("/productCart", productsController.productCart);


// la ruta completa es:  /products/productCart
module.exports = router;

// app.get("/productCart", function(req,res){
//     res.sendFile(path.join(__dirname, "src/views/productCart.html"));
// });