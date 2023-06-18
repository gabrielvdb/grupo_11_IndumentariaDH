const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');



const Products = db.Products;
const Categories = db.Categories;

const productsApiControllers = {
       
    listProducts: (req, res) => {
        db.Products.findAndCountAll({ // Utilizamos findAndCountAll en lugar de findAll
            include: [{ association: 'category' }],
        })
        .then(result => {
            let products = result.rows;
            let total = result.count;

            let respuesta = {
                meta: {
                    status: 200,
                    total: total,
                    url: 'api/products'
                },
                data: products
            }
            res.json(respuesta);
        })
    },

    /* listProducts: (req, res) => {
        db.Products.findAndCountAll({
            include: [{ association: 'category' }],
            group: ['category.id'],
            attributes: ['category.id', ['category.category', 'category'], [sequelize.fn('COUNT', sequelize.col('category.id')), 'totalProducts']]
        })
        .then(result => {
            let products = result.rows.map(row => ({
                category: {
                    id: row.category.id,
                    name: row.category
                },
                totalProducts: row.dataValues.totalProducts
            }));
            let total = result.count;

            let respuesta = {
                meta: {
                    status: 200,
                    total: total,
                    url: 'api/products'
                },
                data: products
            }
            res.json(respuesta);
        })
    }, */
    
    
    detalleProducto: (req, res) => {
        db.Products.findByPk(req.params.id,
            {
                include: [
                    {association: "category"},
                    {association: "color"}
                ]
            })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/products/:id'
                    },
                    data: product
                }
                res.json(respuesta);
            });
    },
    
}

module.exports = productsApiControllers;