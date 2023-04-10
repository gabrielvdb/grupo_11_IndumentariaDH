const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {body} = require("express-validator");

/* configuración de Multer */

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/users")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

/* Validaciones de Registro */

const validations = [
    body("nombre").notEmpty().withMessage("Tienes que escribir un nombre válido"),
    body("apellido").notEmpty().withMessage("Tienes que escribir un apellido válido"),
    body("fechaNacimiento").notEmpty().withMessage("Tienes que escribir una fecha de nacimiento válida"),
    body("email").notEmpty().withMessage("Tienes que escribir un email válido").bail()
    .isEmail().withMessage("Formato de correo no válido"),
    body("contrasena").notEmpty().withMessage("Tienes que escribir una contraseña válida"),
    body("categoria").notEmpty().withMessage("Tienes que escribir una categoria válida"),
    body("userImage").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif", ".webp"];
        if (!file) {
            throw new Error("Tienes que subir una imagen");
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
            }
        }
            return true;
    })
]

const userController = require("../controllers/userController.js")

/* Formulario de Login */
router.get("/login", userController.login);

/* Formulario de Registro */
router.get("/register", userController.register);

/* Proceso de Registro */
router.post("/register", upload.single("userImage"), validations ,userController.processRegister);

/* Perfil de Usuario */
router.get("/profile/:userId", userController.profile);


module.exports = router;