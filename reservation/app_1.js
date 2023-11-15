const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const port = 9798;

app.get("/hello", (req, res) => {
  res.send("Hello from backend 9798");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
