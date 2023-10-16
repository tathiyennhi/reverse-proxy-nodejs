const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const port = 9797;

app.get("/hello", (req, res) => {
  res.send("Hello from backend 9797");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
