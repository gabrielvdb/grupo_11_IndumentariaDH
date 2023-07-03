const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Products;
const Categories = db.Category;

const productsApiControllers = {
    
    listProducts: (req, res) => {
        db.Products.findAll({
            include: [
                { association: 'category' },
                { association: 'color' }
            ],
        })
        .then(products => {
            let total = products.length;

            // Obtener el conteo de productos por categoría
            let countByCategory = {};

            products.forEach(product => {
                const categoryName = product.category.category;

                if (countByCategory.hasOwnProperty(categoryName)) {
                    countByCategory[categoryName]++;
                } else {
                    countByCategory[categoryName] = 1;
                }
            });

            // Obtener la cantidad total de categorías
            let totalCategories = Object.keys(countByCategory).length;

            let productsWithDetailUrl = products.map(product => {
                return {
                    ...product.toJSON(),
                    detail_url: `api/products/${product.id}`
                };
            });

            let respuesta = {
                meta: {
                    status: 200,
                    total: total,
                    url: 'api/products',
                    totalCategories: totalCategories,
                    countByCategory: countByCategory
                },
                data: productsWithDetailUrl
            };

            res.json(respuesta);
        });
    },

    detalleProducto: (req, res) => {
        db.Products.findByPk(req.params.id, {
            include: [
                { association: 'category' },
                { association: 'color' }
            ]
        })
        .then(product => {
            const imageUrl = `http://localhost:3000/api/products/${product.productImage}`;

            let respuesta = {
                meta: {
                    status: 200,
                    total: 1,
                    url: '/api/products/:id'
                },
                data: {
                    ...product.toJSON(),
                    productImageUrl: imageUrl
                }
            };
            res.json(respuesta);
        });
    },
};

module.exports = productsApiControllers;













/*     const path = require('path');
    const db = require('../../database/models');
    const sequelize = db.sequelize;
    const { Op } = require("sequelize");
    const moment = require('moment');



    const Products = db.Products;
    const Categories = db.Category;

    const productsApiControllers = {
        
    listProducts: (req, res) => {
        db.Products.findAll({
            include: [
            { association: 'category' },
            {association: "color"}
        ],
        })
        .then(products => {
            let total = products.length;

            // Obtener el conteo de productos por categoría
            let countByCategory = {};

            products.forEach(product => {
                const categoryName = product.category.category;

                if (countByCategory.hasOwnProperty(categoryName)) {
                    countByCategory[categoryName]++;
                } else {
                    countByCategory[categoryName] = 1;
                }
            });

            let productsWithDetailUrl = products.map(product => {
                return {
                    ...product.toJSON(),
                    detail_url: `api/products/${product.id}`
                };
            });

            let respuesta = {
                meta: {
                    status: 200,
                    total: total,
                    url: 'api/products',
                    countByCategory: countByCategory
                },
                data: productsWithDetailUrl
            };

            res.json(respuesta);
        });
    },

      
    detalleProducto: (req, res) => {
        db.Products.findByPk(req.params.id,
            {
                include: [
                    {association: "category"},
                    {association: "color"}
                ]
            })
            .then(product => {

                const imageUrl = `http://localhost:3000/api/products/${product.productImage}`;

                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/products/:id'
                    },
                    data: {
                    ...product.toJSON(), // Convertir el objeto Sequelize en un objeto JSON
                    productImageUrl: imageUrl // Agregar la URL de la imagen de perfil a los datos del usuario
                }
                };
                res.json(respuesta);
            });
    },
    
}

module.exports = productsApiControllers; */