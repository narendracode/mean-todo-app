var express = require('express');
var router = express.Router();
var authController = require('../app/authorization/controllers/AuthController.js');
/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('test.html');
});


router.post('/signup',authController.localSignup);
router.post('/login',authController.localLogin);
router.post('/logout',authController.logout);
router.get('/userinfo',authController.getCurentUserInfo);


module.exports = router;
