const authControllers = require('../controllers/authController');

const express = require('express');

const router = express.Router();

router.route('/signup').post(authControllers.signup);
router.route('/login').post(authControllers.login);

module.exports = router;
