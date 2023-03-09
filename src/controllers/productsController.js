const productsController = {
    productCart: (req, res) => {
        // res.sendFile(path.join(__dirname, "src/views/productCart.html"))
        res.render('/products/productCart')
    }   
}
// Modificar el codigo para saber que va a hace nuestro controlador, que opr el momento muestra datos
module.exports = productsController;