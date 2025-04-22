const express = require('express'); 
const { SignUp, Login, Contact } = require('../controllers/user.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.use(VerifyToken); 

router.post('/signup-user', SignUp);

router.post('/login-user', Login); 

router.post('/contact/:id', Contact); 

module.exports = router;