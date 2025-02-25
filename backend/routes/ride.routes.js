const express=require('express')
const router=express.Router()
const body=require('express-validator')

router.post('/create',
    body('userId').isString().isLength({min:24,max24}).withMessage('userId is required'),
    body('pickup').isString().isLength({min:3}).withMessage('invalid pickiup address'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination address'),
    
)

module.exorts=router;