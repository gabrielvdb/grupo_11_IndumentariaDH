module.exports = (sequelize, dataTypes) => {
    
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        userName: {
            type: dataTypes.STRING
        },
        userLastName: {
            type: dataTypes.STRING
        },
        dateOfBirth: {
            type: dataTypes.DATEONLY
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        roleid: {
            type: dataTypes.INTEGER
        },
        userImage: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = function (models) {
        User.belongsTo(models.Role, {
            as: "role",
            foreignKey: "roleid"
        });
    }
    return User;
}
