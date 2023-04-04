const fs = require('fs'); 
const path = require("path"); 

const rutaProductosJson = path.join(__dirname, '../data/productsDataBase.json');

const productController = {
    productList: (req, res) => {
        const listaProductos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));
        res.render("products/productList", {listaProductos:listaProductos });
    },

    detailProduct: (req, res) => {
        let prendaId = req.params.id;
        const listaProductos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));
        const prendaAMostrar = listaProductos.find(prenda =>{
            return prenda.id == prendaId;
        });
        res.render("products/detailProduct", {prenda:prendaAMostrar });
    },

    productDetail: (req, res) => {
        res.render("products/productDetailAldi");
    },

    productCart: (req, res) => {
        res.render("products/productCart");
    },
  
    addProduct: (req, res) => {
        res.render("products/addProduct");
    },

    saveProduct: (req, res) => {
        const listaProductos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));

        console.log(req.body);

        let productoNuevo = {
            id: listaProductos[listaProductos.length -1].id +1,
            nombre: req.body.nombre,
            rate: req.body.rate,
            precioAntes: req.body.precioAntes,
            precioAhora: req.body.precioAhora,
            discount: req.body.discount,
            descripcion: req.body.descripcion,
            color: req.body.color,
            categoria: req.body.categoria,
            img1: req.body.categoria + "/" + req.body.img1, // MODIFICAR - HAY QUE USAR MULTER !!!!!!!!
        };

        listaProductos.push(productoNuevo);

        let productosJSON = JSON.stringify(listaProductos, null, " ");

        fs.writeFileSync(rutaProductosJson, productosJSON);

        res.redirect("/products");
    },

    editProduct: (req, res) => {
        res.render("products/editProduct");
    },

    updateProduct: (req, res) => {
        res.render("products/editProduct");
    },

    deleteProduct: (req, res) => {
        res.render("products/Product");
    },
}

module.exports = productController;