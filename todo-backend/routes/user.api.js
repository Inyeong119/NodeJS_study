 const express = require('express');
 const router = express.Router();
 const userController = require('../controller/user.controller');

 //1. 회원가입 endpoint
 router.post('/',userController.createUser);

//2. 로그인 endpoint
router.post('/login',userController.loginWithEmail);

 module.exports = router;