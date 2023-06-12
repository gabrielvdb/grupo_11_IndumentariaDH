const fs = require('fs'); 
const path = require("path"); 
const db = require("../database/models"); /* Tengo que quitarla despues */

const rutaProductosJson = path.join(__dirname, '../data/productsDataBase.json');

const productController = {
    productList: (req, res) => {
        const listaProductos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));
        res.render("products/productList", {listaProductos:listaProductos});
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

        /* console.log(req.body); */

        let productoNuevo = {
            id: listaProductos[listaProductos.length -1].id +1,
            nombre: req.body.nombre,
            rate: req.body.rate,
            precioAntes: parseInt(req.body.precioAntes),
            precioAhora: parseInt(req.body.precioAhora),
            discount: parseInt(req.body.discount),
            descripcion: req.body.descripcion,
            color: req.body.color,
            categoria: req.body.categoria,
            img1: req.file ? req.file.filename : "default-product-image.png"
        };

        listaProductos.push(productoNuevo);

        let productosJSON = JSON.stringify(listaProductos, null, " ");

        fs.writeFileSync(rutaProductosJson, productosJSON);

        res.redirect("/product");
    },

    editProduct: (req, res) => {

        let prendaId = req.params.id;
        const listaProductos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));
        const productoEditar = listaProductos.find(prenda =>{
            return prenda.id == prendaId;
        }); 
        res.render("products/editProduct", {productoEditar: productoEditar});
    },

    updateProduct: (req, res) => {
        let prendaId = req.params.id;
        const listaProductos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));
        let productoSinEdicion = listaProductos.find(prenda => {
            return prenda.id == prendaId; 
        });

        let productoEditado = {
            id: prendaId,
			nombre: req.body.nombre,
            rate: req.body.rate,
            precioAntes: parseInt(req.body.precioAntes),
            precioAhora: parseInt(req.body.precioAhora),
            discount: parseInt(req.body.discount),
            descripcion: req.body.descripcion,
            color: req.body.color,
            categoria: req.body.categoria,
            img1: req.file ? req.file.filename : productoSinEdicion.img1
        };

        let indiceProducto = listaProductos.findIndex(prenda =>{
            return prenda.id == prendaId;
        });

        listaProductos[indiceProducto] = productoEditado;

        let productosJSON = JSON.stringify(listaProductos, null, " ");

        fs.writeFileSync(rutaProductosJson, productosJSON);

        res.redirect("/product");
    },

    deleteProduct: (req, res) => {
        let prendaId = req.params.id;

        const listaProductos = JSON.parse(fs.readFileSync(rutaProductosJson, "utf-8"));

        let listaProductosActualizada = listaProductos.filter(prenda =>{
            return prenda.id != prendaId;
        });
        
        let productosJSON = JSON.stringify(listaProductosActualizada, null, " ");

        fs.writeFileSync(rutaProductosJson, productosJSON);

        res.redirect("/product");
    },

    destroy : (req, res) => {
		let id = req.params.id;
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let finalProducts = products.filter(product => {
			return product.id != id;
		})
		
		/* Reconvertir a JSON */
		let productsJSON = JSON.stringify(finalProducts, null, " ");

		/* Escribir en el archivo JSON en si */
		fs.writeFileSync(productsFilePath, productsJSON);

		res.redirect("/product");
	}
}

module.exports = productController;