const { Server } = require("socket.io");
const userModel=require('./Models/user.Model')
const captainModel=require('./Models/captain.model')
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join',async (data)=>{
        const {userId,userType}=data;
        if(userType=='user'){
            const user=await userModel.findByIdAndUpdate(userId,{socketId:socket.id},{new:true})
        }
    })
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, message) => {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.error("Socket.io is not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};