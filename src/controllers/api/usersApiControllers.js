const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');



const Users = db.User;

const usersApiControllers = {

    listUsers: (req, res) => {
        db.User.findAll({
            include: [{ association: 'role' }],
        })
        .then(users => {
            const totalUsers = users.length;

            let usersWithDetailUrl = users.map(user => {
                return {
                    ...user.toJSON(),
                    detail_url: `api/users/${user.id}` // Agrega la URL dinámica para el detalle del usuario
                };
            });

            let respuesta = {
                meta: {
                    status: 200,
                    total: totalUsers,
                    url: 'api/users'
                },
                data: usersWithDetailUrl
            };

            res.json(respuesta);
        });
    },

    detalleUsuario: (req, res) => {
        db.User.findByPk(req.params.id, {
            include: [{ association: 'role' }],
        })
        .then(user => {
            // Construir la URL de la imagen de perfil
            delete user.dataValues.password;
            delete user.dataValues.role;
            delete user.dataValues.roleid;

            const imageUrl = `http://localhost:3000/api/users/${user.userImage}`;
    
            let respuesta = {
                meta: {
                    status: 200,
                    total: 1, // El detalle de usuario solo devuelve un usuario, por lo que el total es 1
                    url: '/api/users/:id'
                },
                data: {
                    ...user.toJSON(), // Convertir el objeto Sequelize en un objeto JSON
                    userImageUrl: imageUrl // Agregar la URL de la imagen de perfil a los datos del usuario
                }
            };
    
            res.json(respuesta);
        });
    },
    
    
}

module.exports = usersApiControllers;