const express=require('express')
const router=express.Router();
const {body}=require('express-validator')
const userController=require('../controllers/user.controller')
const authMiddleware=require("../middlewares/auth.middleware")

router.post('/register',userController.registerUser)

router.post('/login',userController.loginUser)
router.post('/forgot',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('privateKey').isLength({min:4}).withMessage('Private key must be at least 4 characters long')
],userController.forgotPassword)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports=router;