const path = require('path');
const { body } = require('express-validator');

module.exports = [
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