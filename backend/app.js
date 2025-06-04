const express=require('express')
require('dotenv').config();
const cookieParser=require('cookie-parser')
const ConnectToDb=require('./db/db.js')
const userRoutes=require('./routes/user.routes.js')
const captainRoutes=require('./routes/captain.routes.js')
const mapsRoutes=require('./routes/maps.routes.js')
const rideRoutes=require('./routes/ride.routes.js')
const cors=require('cors')


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({ 
    origin: [
        "http://localhost:5174",
        "https://cabease-a4k3.onrender.com",
        "https://cab-ease-87je7upkq-shubhams-projects-b885d3f5.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
ConnectToDb()
app.get('/',(req,res)=>{
    res.send("hello world");
})

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)
module.exports=app