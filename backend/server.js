require('dotenv').config();
const http=require('http')
const app=require('./app');
const cors=require('cors')

const port=process.env.PORT;
const server=http.createServer(app)
app.use(cors({origin:"*"}));

server.listen(port,()=>{
    console.log(`Server has started at port: ${port}`);
})