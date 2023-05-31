const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
var Sequelize = require("sequelize");

const db = require('../database/models');

// Definir las funciones del controlador
const userController = {
  // Mostrar formulario de registro de usuario
  register: (req, res) => {
    res.render("users/register", { oldData: req.body, errors: null });
  },

  // Procesar registro de usuario
  processRegister: async (req, res) => {
    const roleId = req.body.categoria;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.render("users/register", { errors: errors.mapped(), oldData: req.body }); 
    }
    
    try {
      const { nombre, apellido, fechaNacimiento, email, contrasena, categoria } = req.body;

      const existingUser = await db.User.findOne({
        where: {
          email: email
        }
      });
      
      if (existingUser) {
        return res.render("users/register", {
          errors: { email: { msg: "Este email ya está registrado" } },
          oldData: req.body
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      const newUser = await db.User.create({
        userName: nombre,
        userLastName: apellido,
        dateOfBirth: fechaNacimiento,
        email: email,
        password: hashedPassword,
        roleid: roleId, // Cambia esto según tu lógica de roles de usuario
        userImage: req.file ? req.file.filename : null
      });

      res.redirect("/users/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      res.render("error");
    }
  },

  // Mostrar formulario de inicio de sesión
  login: (req, res) => {
    res.render("users/login", { oldData: req.body, errors: null });
  },

  processLogin: async (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.render("users/login", { errors: errors.mapped(), oldData: req.body });
    }   
       
    try {
        const userToLogin = await db.User.findOne({
        where: {
          email: req.body.email
        },
        include: [{ model: db.Role, as: "role" }] // Incluir la asociación con el modelo de Role
      });
      

      if (userToLogin) {
        const isPasswordValid = bcrypt.compareSync(req.body.contrasena, userToLogin.password);
        console.log(userToLogin);
        if (isPasswordValid) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;

          if (req.body.remember) {
            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
          }

          return res.redirect('/users/userProfile');
        }

        return res.render('users/login', {
          errors: {
            email: {
              msg: 'Las credenciales son inválidas'
            }
          },
          oldData: req.body
        });
      }

      return res.render('users/login', {
        errors: {
          email: {
            msg: 'Este email no está registrado en nuestra base de datos'
          }
        },
        oldData: req.body
      });
    } catch (error) {
      console.error("Error al procesar el inicio de sesión:", error);
      res.render("error");
    }
  },


  profile: (req, res) => {
    res.render("users/userprofile", { user: req.session.userLogged });
  },

  logout: (req, res) => {
    req.session.destroy(); // Eliminar la sesión del usuario
    res.redirect("/users/login");
  }
};

module.exports = userController;






/* const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");


const User = require('../models/User');

const userController = {
	register: (req, res) => {
        res.render("users/register");
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render("users/register", {
                errors: resultValidation.mapped(), 
                oldData: req.body  
            });
        }
        let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			contrasena: bcryptjs.hashSync(req.body.contrasena, 10),
			userImage: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
    },

    login: (req, res) => {
        res.render("users/login");
    },

    processLogin: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.contrasena, userToLogin.contrasena);
			if (isOkThePassword) {
				delete userToLogin.contrasena;
				req.session.userLogged = userToLogin;

				if(req.body.remember) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/users/userProfile');
			} 
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'Este email no está registrado en nuestra base de datos'
				}
			}
		});
	},
    
    profile: (req, res) => {
		return res.render("users/userProfile", {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = userController;
 */
