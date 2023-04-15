const bcryptjs = require('bcryptjs');
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