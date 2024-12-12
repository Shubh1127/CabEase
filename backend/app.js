const express=require('express')
require('dotenv').config();
const cookieParser=require('cookie-parser')
const ConnectToDb=require('./db/db.js')
const userRoutes=require('./routes/user.routes.js')
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

ConnectToDb()
app.get('/',(req,res)=>{
    res.send("hello world");
})

app.use('/users',userRoutes)

module.exports=app