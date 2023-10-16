const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  // Gửi sự kiện "hello" mỗi 5 giây
  const interval = setInterval(() => {
    socket.emit("hello", "Hello from server 1!");
  }, 5000);

  // Ngắt kết nối khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const port = 1234;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
