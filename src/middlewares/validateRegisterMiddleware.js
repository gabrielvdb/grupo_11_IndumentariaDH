const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body("nombre")
        .notEmpty().withMessage("Tienes que escribir un nombre válido")
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres."),
    body("apellido")
        .notEmpty().withMessage("Tienes que escribir un apellido válido")
        .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres."),
    body("fechaNacimiento")
        .notEmpty().withMessage("Tienes que escribir una fecha de nacimiento válida"),
    body("email")
        .notEmpty().withMessage("Tienes que escribir un email válido").bail()
        .isEmail().withMessage("Formato de correo no válido"),
    body("contrasena")
        .notEmpty().withMessage("Tienes que escribir una contraseña válida")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage("La contraseña debe contener letras mayúsculas, minúsculas, al menos un número y un carácter especial.")
        .bail(),
    body("categoria")
        .notEmpty().withMessage("Tienes que escribir una categoria válida"),
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
