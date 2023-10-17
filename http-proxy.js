const express = require("express");
const http = require("http");
const httpProxy = require("http-proxy");
const socketIO = require("socket.io");

// Tạo Express app và máy chủ HTTP
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Server 1 - Sử dụng Socket.IO cho WebSocket
io.on("connection", (socket) => {
  console.log("Client connected to WebSocket Server 1");

  const interval = setInterval(() => {
    socket.emit("hello", "Hello from WebSocket server 1!");
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected from WebSocket Server 1");
    clearInterval(interval);
  });
});

// Server 2 - Sử dụng Socket.IO cho WebSocket
const server2 = http.createServer();
const io2 = socketIO(server2);

io2.on("connection", (socket) => {
  console.log("Client connected to WebSocket Server 2");

  const interval = setInterval(() => {
    socket.emit("hello", "Hello from WebSocket server 2!");
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected from WebSocket Server 2");
    clearInterval(interval);
  });
});

// Kết nối cổng đầu vào chung (port 9091)
const port = 9091;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Tạo proxy để chuyển hướng yêu cầu đến các server WebSocket khác nhau
const proxy = httpProxy.createProxyServer();
const proxyServer2 = http.createServer((req, res) => {
  proxy.web(req, res, { target: "http://localhost:9092" }); // Chuyển hướng đến server2
});

server2.listen(9092, () => {
  console.log(`WebSocket Server 2 listening on port 9092`);
});

app.use("/socket", (req, res) => {
  proxy.web(req, res, { target: "http://localhost:9093" }); // Chuyển hướng đến server1
});
