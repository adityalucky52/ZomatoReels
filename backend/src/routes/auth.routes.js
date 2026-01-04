const express = require('express'); 
const router = express.Router();

const authController = require('../controllers/auth.controller');

//user auth api
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);
//food partner auth api
router.post('/foodpartner/register', authController.registerFoodPartner);
router.post('/foodpartner/login', authController.loginFoodPartner);
router.post('/foodpartner/logout', authController.logoutFoodPartner);
//general logout route (works for both user types)
router.post('/logout', authController.logoutUser);
//check auth status
router.get('/me', authController.getMe);

module.exports = router;