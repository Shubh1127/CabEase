const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const rideController=require('../controllers/ride.controller')
const authMiddleware=require('../middlewares/auth.middleware')

router.post('/create',authMiddleware.authUser,[
    body('pickup').isString().isLength({min:3}).withMessage('invalid pickiup address'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('invalid vehicle type')],
    rideController.createRide
)

module.exports=router;