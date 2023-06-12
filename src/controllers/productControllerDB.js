const db = require("../database/models");
/* const Op = db.Sequelize.Op; */

const productControllerDB = {
    getProductsByCategory: function (category) {
        return function (req, res) {
          db.Products.findAll({
            include: [{ association: 'category' }],
            where: { '$category.category$': category } // Filtra por el nombre de la categoría
          })
            .then(products => {
              res.render('products/productListDB', { products: products });
            })
            .catch(error => {
              res.send(error);
            });
        };
    },
    productList: (req, res) => {
        db.Products.findAll({
            include: [
                {association: "category"}
            ]
        })
        .then(products => {
            res.render("products/productListDB", {products:products})
        })
        .catch(error => {
            res.send(error)
        })
    },
    detail: (req, res) => {
        db.Products.findByPk(req.params.id, {
            include: [
                {association: "category"},
                {association: "color"}
            ]
        })
        .then(product => {
            res.render("products/detailProductDB", {product}) 
        })
        .catch(error => {
            res.send(error)
        })
    },
    
    create: function (req, res) {
      // Obtener todas las categorías y colores disponibles
      db.Category.findAll()
        .then(categories => {
          db.Color.findAll()
            .then(colors => {
              res.render("products/createProductDB", { categories, colors });
            })
            .catch(error => {
              res.send(error);
            });
        })
        .catch(error => {
          res.send(error);
        });
    },
  
    processCreate: function (req, res) {
      // Obtener los valores de la categoría y el color seleccionados o nuevos
      const categoryId = req.body.category;
      const colorId = req.body.color;
      const nuevaCategoria = req.body.nuevaCategoria;
      const nuevoColor = req.body.nuevoColor;
    
      // Validar los datos de entrada
    /* if (!req.body.nombre || req.body.nombre.length < 5) {
      return res.send("El nombre es obligatorio y debe tener al menos 5 caracteres.");
    }

    if (!req.body.descripcion || req.body.descripcion.length < 20) {
      return res.send("La descripción es obligatoria y debe tener al menos 20 caracteres.");
    }

    if (!req.file || !isValidImage(req.file)) {
      return res.send("La imagen es obligatoria y debe ser un archivo válido (JPG, JPEG, PNG, GIF).");
    } */
        
      // Verificar si se seleccionó una categoría existente
      if (categoryId !== "nueva") {
        // Crear el producto con la categoría existente
        db.Products.create({
          product: req.body.nombre,
          rate: req.body.rate,
          beforePrice: req.body.precioAntes,
          afterPrice: req.body.precioAhora,
          discount: req.body.discount,
          description: req.body.descripcion,
          categoryid: categoryId,
          colorid: colorId,
          size: req.body.size,
          productImage: req.file ? req.file.filename : "default-product-image.png"
        })
          .then(products => {
            res.redirect("/products");
          })
          .catch(error => {
            res.send(error);
          });
      } else {
        // Crear una nueva categoría
        db.Category.create({
          category: nuevaCategoria
        })
          .then(newCategory => {
            // Verificar si se seleccionó un color existente
            if (colorId !== "nuevo") {
              // Crear el producto con la nueva categoría y el color existente
              db.Products.create({
                product: req.body.nombre,
                rate: req.body.rate,
                beforePrice: req.body.precioAntes,
                afterPrice: req.body.precioAhora,
                discount: req.body.discount,
                description: req.body.descripcion,
                categoryid: newCategory.id,
                colorid: colorId,
                size: req.body.size,
                productImage: req.file ? req.file.filename : "default-product-image.png"
              })
                .then(products => {
                  res.redirect("/products");
                })
                .catch(error => {
                  res.send(error);
                });
            } else {
              // Crear un nuevo color
              db.Color.create({
                color: nuevoColor
              })
                .then(newColor => {
                  // Crear el producto con la nueva categoría y el nuevo color
                  db.Products.create({
                    product: req.body.nombre,
                    rate: req.body.rate,
                    beforePrice: req.body.precioAntes,
                    afterPrice: req.body.precioAhora,
                    discount: req.body.discount,
                    description: req.body.descripcion,
                    categoryid: newCategory.id,
                    colorid: newColor.id,
                    size: req.body.size,
                    productImage: req.file ? req.file.filename : "default-product-image.png"
                  })
                    .then(products => {
                      res.redirect("/products");
                    })
                    .catch(error => {
                      res.send(error);
                    });
                })
                .catch(error => {
                  res.send(error);
                });
            }
          })
          .catch(error => {
            res.send(error);
          });
      }
    },


    edit: function (req, res) {
        db.Products.findByPk(req.params.id, {
          include: [
            { association: "category" },
            { association: "color" }
          ]
        })
          .then(Product => {
            db.Category.findAll()
              .then(categories => {
                db.Color.findAll()
                  .then(colors => {
                    res.render("products/productEditDB", { Product, categories, colors });
                  })
                  .catch(error => {
                    res.send(error);
                  });
              })
              .catch(error => {
                res.send(error);
              });
          })
          .catch(error => {
            res.send(error);
          });
      },
         
    processEdit: function (req, res) {
      db.Products.findByPk(req.params.id, {
        include: [
          { association: "category" },
          { association: "color" }
        ]
      })
        .then(product => {
          if (!product) {
            return res.send("El producto no existe");
          }
    
          // Obtener los valores de la categoría y el color seleccionados o nuevos
          const categoryId = req.body.category;
          const colorId = req.body.color;
          const nuevaCategoria = req.body.nuevaCategoria;
          const nuevoColor = req.body.nuevoColor;
    
          // Actualizar los datos del producto
          product.product = req.body.nombre;
          product.rate = req.body.rate;
          product.beforePrice = req.body.precioAntes;
          product.afterPrice = req.body.precioAhora;
          product.discount = req.body.discount;
          product.description = req.body.descripcion;
          product.size = req.body.size;
          product.productImage = req.file ? req.file.filename : product.productImage;
    
          // Verificar si se seleccionó una nueva categoría
          if (categoryId === "nueva") {
            db.Category.create({
              category: nuevaCategoria
            })
              .then(newCategory => {
                product.categoryid = newCategory.id;
    
                // Verificar si se seleccionó un nuevo color
                if (colorId === "nuevo") {
                  db.Color.create({
                    color: nuevoColor
                  })
                    .then(newColor => {
                      product.colorid = newColor.id;
    
                      // Guardar los cambios en la base de datos
                      product.save()
                        .then(() => {
                          res.redirect("/products/detailProductDB/" + product.id);
                        })
                        .catch(error => {
                          res.send(error);
                        });
                    })
                    .catch(error => {
                      res.send(error);
                    });
                } else {
                  // Guardar los cambios en la base de datos
                  product.save()
                    .then(() => {
                      res.redirect("/products/detailProductDB/" + product.id);
                    })
                    .catch(error => {
                      res.send(error);
                    });
                }
              })
              .catch(error => {
                res.send(error);
              });
          } else if (colorId === "nuevo") {
            db.Color.create({
              color: nuevoColor
            })
              .then(newColor => {
                product.colorid = newColor.id;
    
                // Guardar los cambios en la base de datos
                product.save()
                  .then(() => {
                    res.redirect("/products/detailProductDB/" + product.id);
                  })
                  .catch(error => {
                    res.send(error);
                  });
              })
              .catch(error => {
                res.send(error);
              });
          } else {
            // Guardar los cambios en la base de datos
            product.save()
              .then(() => {
                res.redirect("/products/detailProductDB/" + product.id);
              })
              .catch(error => {
                res.send(error);
              });
          }
        })
        .catch(error => {
          res.send(error);
        });  
        
    },
    delete: function (req, res) {
            db.Products.findByPk(req.params.id)
            .then(product => {
                res.render("products/deleteProductDB", {Product: product})
            })
            .catch(error => {
                res.send(error)
            })
        },
    processDelete: function (req, res) {
            db.Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(products => {
                res.redirect("/products")
            })
            .catch(error => {
                res.send(error)
            })
        },
    productCart: (req, res) => {
      res.render("products/productCart");
        }
    }

module.exports = productControllerDB;