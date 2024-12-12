const express=require('express')
require('dotenv').config();
const ConnectToDb=require('./db/db.js')
const app=express();

ConnectToDb()
app.get('/',(req,res)=>{
    res.send("hello world");
})

module.exports=app