require("dotenv").config();
const { Server } = require("socket.io");
const userModel = require("./Models/user.Model");
const captainModel = require("./Models/captain.model");
const UserModel = require("./Models/user.Model");
const CaptainModel = require("./Models/captain.model");
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

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);
      if (userType === "user") {
        await userModel.findByIdAndUpdate(
          userId,
          { socketId: socket.id },
          { new: true }
        );
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(
          userId,
          { socketId: socket.id },
          { new: true }
        );
      }
    });

      socket.on("update-location-captain", async (data) => {
        const {userId,location} = data;
        if(!location || !location.ltd || !location.lng){
          return socket.emit('error',{message:"Invalid location data"});
        }
        console.log(`Captain ${userId} updated location: ${JSON.stringify(location)}`);
        const geoLocation={
          type:"Point",
          coordinates:[location.lng,location.ltd]
        }
        const captain=await captainModel.findByIdAndUpdate(userId,{location:geoLocation},{new:true});
      
      });

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
