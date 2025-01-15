import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io"; // Correct import
import http from "http"; // Required to create an HTTP server

import connectToMongo from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

// Database Connection
connectToMongo().then(() => {
  console.log("Connected to MongoDB");
});

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update to the correct client URL
    credentials: true,
  },
});

// Global variable for online users
global.onlineUsers = new Map();

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User added: ${userId}`);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(`Sending message to user ${data.to}: ${data.message}`);
      io.to(sendUserSocket).emit("msg-receive", data.message); // Forward message to recipient
    }
  });
});

// Start the server
server.listen(PORT, (err) => {
  if (err) console.log("Error:", err);
  else console.log(`Server running on PORT ${PORT}`);
});
