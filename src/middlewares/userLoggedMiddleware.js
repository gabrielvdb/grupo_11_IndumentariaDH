const db = require("../database/models");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session.userLogged) {
    // Si hay una sesión activa, buscar al usuario en la base de datos
    db.User.findOne({ where: { email: req.session.userLogged.email } })
      .then((user) => {
        if (user) {
          res.locals.isLogged = true;
          res.locals.userLogged = user;
        }

        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  } else if (req.cookies.userEmail) {
    // Si no hay una sesión activa, pero hay una cookie que recuerda al usuario, establecer la sesión
    db.User.findOne({ where: { email: req.cookies.userEmail } })
      .then((user) => {
        if (user) {
          req.session.userLogged = user;
          res.locals.isLogged = true;
          res.locals.userLogged = user;
        }

        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  } else {
    // Si no hay sesión ni cookie, continuar
    next();
  }
}

module.exports = userLoggedMiddleware;

/* Middleware Nuestro */

/* const db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail;

  if (emailInCookie) {
    db.User.findOne({
      where: {
        email: emailInCookie
      }
    })
      .then(userFromCookie => {
        if (userFromCookie) {
          req.session.userLogged = userFromCookie;
          res.locals.isLogged = true;
          res.locals.userLogged = req.session.userLogged;
        }
        next();
      })
      .catch(error => {
        console.error("Error al buscar el usuario en la base de datos:", error);
        next(error);
      });
  } else {
    next();
  }
}

module.exports = userLoggedMiddleware; */



/* Middleware con JSON */

/* const User = require('../database/models/UserData');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware; */
