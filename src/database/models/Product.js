module.exports = (sequelize, dataTypes) => {
    
    let alias = "Products";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        product: {
            type: dataTypes.STRING
        },
        rate: {
            type: dataTypes.INTEGER
        },
        beforePrice: {
            type: dataTypes.INTEGER
        },
        afterPrice: {
            type: dataTypes.STRING
        },
        discount: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING
        },
        colorid: {
            type: dataTypes.INTEGER
        },
        categoryid: {
            type: dataTypes.INTEGER
        },
        productImage: {
            type: dataTypes.STRING
        },
        size: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryid"
        });
        Product.belongsTo(models.Color, {
            as: "color",
            foreignKey: "colorid"
        });
    }
    return Product;
}