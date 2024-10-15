const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller');  // Check path
const passport =require('../config/passportConfig');
const isAuth = require('../middleware/isAuthenticated');


// Define routes
router.get('/', authController.getHomePage);
router.get('/signup', authController.getSignupPage);
router.get('/login', authController.getLoginPage);
router.post('/signup', authController.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authController.login);
router.get('/logout', authController.logout);
router.get('/profile',authController.profile);
router.get('/addtopic',authController.addtopic);






module.exports = router;
