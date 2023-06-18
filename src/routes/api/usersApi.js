const express = require('express');
const router = express.Router();
const usersApiControllers = require('../../controllers/api/usersApiControllers.js');

router.get('/', usersApiControllers.listUsers);

router.get('/:id', usersApiControllers.detalleUsuario);

module.exports = router;