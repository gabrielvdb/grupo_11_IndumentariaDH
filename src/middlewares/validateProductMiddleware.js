const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body("nombre")
        .notEmpty().withMessage("Tienes que escribir un nombre válido")
        .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres."),
    body("descripcion")
        .notEmpty().withMessage("Tienes que escribir un apellido válido")
        .isLength({ min: 20 }).withMessage("El apellido debe tener al menos 20 caracteres."),
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
