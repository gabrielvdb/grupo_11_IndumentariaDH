const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');



const Users = db.User;

const usersApiControllers = {

    listUsers: (req, res) => {
        db.User.findAndCountAll({ // Utilizamos findAndCountAll en lugar de findAll
            include: [{ association: 'role' }],
        })
        .then(result => {
            const totalUsers = result.count; // Obtenemos el total de usuarios
            const users = result.rows; // Obtenemos los usuarios
    
            let respuesta = {
                meta: {
                    status : 200,
                    total: totalUsers, // Agregamos el total de usuarios a la respuesta
                    url: 'api/users'
                },
                data: users
            };
            
            res.json(respuesta);
        });
    },
    
    /* detalleUsuario: (req, res) => {
        db.User.findByPk(req.params.id,
            {
                include: [{ association: 'role' }],
            })
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: '/api/users/:id'
                    },
                    data: user
                }
                res.json(respuesta);
            });
    }, */

    detalleUsuario: (req, res) => {
        db.User.findByPk(req.params.id, {
            include: [{ association: 'role' }],
        })
        .then(user => {
            // Construir la URL de la imagen de perfil
            const imageUrl = `https://localhost:3000/api/users/${user.userImage}`;
    
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