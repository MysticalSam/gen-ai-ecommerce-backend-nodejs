const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.registerUser);
router.get('/profile', userController.getUserProfileFromToken);
router.get('/', userController.getAllUsers);

module.exports = router;