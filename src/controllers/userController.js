const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
var Sequelize = require("sequelize");

const db = require('../database/models');

// Definir las funciones del controlador
const userController = {
  // Mostrar formulario de registro de usuario
  register: (req, res) => {
    res.render("users/register", { oldData: req.body, errors: null });
  },

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
   
      /* const hashedPassword = await bcryptjs.hashSync(req.body.contrasena, 10) ; */
        
      const role = await db.Role.findOne({
        where: {
          role: categoria // Cambia esto según tu lógica para obtener el rol correcto
        }
      });
  
      const newUser = await db.User.create({
        userName: nombre,
        userLastName: apellido,
        dateOfBirth: fechaNacimiento,
        email: email,
        password: bcryptjs.hashSync(req.body.contrasena,10),
        roleid: role ? role.id : null, // Asigna el ID del rol encontrado, o null si no se encontró
        userImage: req.file ? req.file.filename : user.userImage
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
    try {
      const { email, contrasena } = req.body;
  
      // Buscar el usuario por email
      const userToLogin = await db.User.findOne({
        where: {
          email: email
        }
      });
  
      // Si no se encontró el usuario, mostrar un error
      if (!userToLogin) {
        return res.render('users/login', {
          errors: {
            email: {
              msg: 'Este email no está registrado en nuestra base de datos'
            }
          },
          oldData: req.body // Agregar los datos ingresados por el usuario para mantenerlos en el formulario
        });
      }
  
      // Verificar que la contraseña sea válida
      /* const isPasswordValid = await bcryptjs.compare(contrasena, userToLogin.password); */
      let isPasswordValid = bcryptjs.compare(req.body.contrasena, userToLogin.password);
  
      // Si la contraseña no es válida, mostrar un error
      if (!isPasswordValid) {
        return res.render('users/login', {
          errors: {
            contrasena: {
              msg: 'Las credenciales son inválidas'
            }
          },
          oldData: req.body // Agregar los datos ingresados por el usuario para mantenerlos en el formulario
        });
      }
  
      // Eliminar la contraseña del objeto usuario
      delete userToLogin.password;
  
      // Guardar el usuario en la sesión
      req.session.userLogged = userToLogin;
  
      // Si el usuario marcó la opción de recordar
      if (req.body.remember) {
        // Crear una cookie con el email del usuario
        res.cookie('userEmail', email, { maxAge: (1000 * 60) * 60 });
      }
  
      // Redirigir al perfil del usuario
      return res.redirect('/users/userProfile');
    } catch (error) {
      console.error("Error al procesar el inicio de sesión:", error);
      res.render("users/login");
    }
  },
  
  
  profile: (req, res) => {
    res.render("users/userProfile", { user: req.session.userLogged });
  },

  logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = userController;







  
/* processLogin con problema en el servidor, pero el resto si funciona */

/* processLogin: (req, res) => {
  let userToLogin = db.User.findOne ({
    where: {
      email: req.body.email
    }
  });
  
  if (userToLogin) {
    let isPasswordValid = bcryptjs.compare(req.body.contrasena, userToLogin.password);
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
}, */







/* userController JSON */

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
