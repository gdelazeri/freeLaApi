const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();

/* POST /login */
router.post('/', LoginController.login);

module.exports = router;
