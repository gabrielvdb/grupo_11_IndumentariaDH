const { validationResult }= require("express-validator");

const userController = {
    login: (req, res) => {
        res.render("users/login");
    },
    
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
        return res.send("Ok, las validaciones pasaron y no hay errores");
    },

    profile: (req, res) => {
        res.render("users/userProfile");
    }
}

module.exports = userController;