const express=require('exp')
const router=express.Router();
const {body}=require('express-validator')
const usrController=require('../controllers/user.controller')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charadcters long'),
    body('password').isLength({min:6}).withMessage('Pasword must be at least 6 characters long')
],usrController.registerUser)



module.exports=router;