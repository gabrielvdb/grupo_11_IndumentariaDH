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

const categoriesController = require("../controllers/categoriesController.js")

/* PRUEBA 1 VINCULACIÓN BASE DE DATOS */
router.get("/", categoriesController.categoriesList);
router.get("/detail/:id", categoriesController.detail);

module.exports = router;