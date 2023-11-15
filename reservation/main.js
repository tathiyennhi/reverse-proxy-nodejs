const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// Tạo Express app và máy chủ HTTP
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Server 1 - Sử dụng Socket.IO cho WebSocket
io.on("connection", (socket) => {
  console.log("Client connected");

  const interval = setInterval(() => {
    socket.emit("hello", "Hello from server 1!");
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

// Server 2 - Sử dụng Express cho HTTP
app.get("/hello", (req, res) => {
  res.send("Hello from backend 9797");
});

// Kết nối cổng đầu vào chung (port 9090)
const port = 9191;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
