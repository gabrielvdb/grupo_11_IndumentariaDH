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

const db = require('../database/models');

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

module.exports = userLoggedMiddleware;
