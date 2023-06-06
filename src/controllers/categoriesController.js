const db = require("../database/models");
/* const Op = db.Sequelize.Op; */

const categoriesController = {
    categoriesList: (req, res) => {
        db.Categories.findAll()
        .then(categories => {
            res.render("products/categoriesList", {categories})
            /* res.send(products) */
        })
        .catch(error => {
            res.send(error)
        })
    },
    detail: (req, res) => {
        // Do the magic
        db.Categories.findByPk(req.params.id, {
            include: [
                {association: "products"}
            ]
        })
        .then(category => {
            res.render("products/categoriesDetail", {category})
            /* res.send(genre) */
        })
        .catch(error => {
            res.send(error)
        })
    }
}

module.exports = categoriesController;