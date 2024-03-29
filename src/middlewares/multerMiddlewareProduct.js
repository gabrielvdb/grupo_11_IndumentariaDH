const path = require('path');
const multer = require('multer');

/* configuración de Multer */

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/products")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({storage: storage});

module.exports = uploadFile;




