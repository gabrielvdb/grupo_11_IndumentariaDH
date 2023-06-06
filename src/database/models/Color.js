module.exports = (sequelize, dataTypes) => {
    
    let alias = "Color";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        color: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "color",
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config)

    Color.associate = function (models) {
        Color.hasMany(models.Products, {
            as: "products",
            foreignKey: "colorid"
        })
    }

    return Color;
}