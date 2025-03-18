const express=require('express')
const router=express.Router();
const {body}=require('express-validator')
const userController=require('../controllers/user.controller')
const authMiddleware=require("../middlewares/auth.middleware")

router.post('/register',userController.registerUser)

router.post('/login',userController.loginUser)


router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)

router.post('refresh-token',userController.refreshToken)
module.exports=router;