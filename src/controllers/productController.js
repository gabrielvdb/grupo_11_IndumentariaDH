const productController = {
    productCart: (req, res) => {
        res.render("products/productCart");
    },

    productDetail: (req, res) => {
        res.render("products/productDetail");
    },

    addProduct: (req, res) => {
        res.render("products/addProduct");
    },

    editProduct: (req, res) => {
        res.render("products/editProduct");
    }
}

module.exports = productController;