const express = require('express');
const { register, login, logout } = require('../controllers/Auth.controller.js'); 
const { verifyToken } = require('../middlewares/Auth.middleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

module.exports = router;