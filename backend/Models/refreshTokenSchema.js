const { refreshToken } = require('firebase-admin/app');
const mongoose=require('mongoose');
const refreshTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:'7d'
    }
})

moudule.exports=mongoose.model('RefreshToken',refreshTokenSchema);