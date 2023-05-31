const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {body} = require("express-validator");

/* Middlewares */

const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



/* Controller */
const userController = require("../controllers/userController.js")

/* Formulario de Login */
router.get("/login", guestMiddleware ,userController.login); 

/* Proceso de Login */
/* router.post("/login", validations, userController.processLogin); */
router.post("/login", guestMiddleware, userController.processLogin);

/* Formulario de Registro */
router.get("/register", guestMiddleware, userController.register);

/* Proceso de Registro */
router.post("/register", uploadFile.single("userImage"), validations ,userController.processRegister);

/* Perfil de Usuario */
/* router.get("/profile/:userId", userController.profile); */ /* No quitar el comentario */

// Perfil de Usuario
/* router.get("/userProfile/", userController.profile); */ /* No quitar el comentario */
router.get("/userProfile/", authMiddleware, userController.profile);

// Logout
router.get("/logout/", userController.logout);


module.exports = router;
