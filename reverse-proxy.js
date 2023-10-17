const express = require("express");
const http = require("http");
const httpProxy = require("http-proxy");

const app = express();
const server = http.createServer(app);
const proxy = httpProxy
  .createProxyServer({
    // target: ["http://localhost:1235", "http://localhost:1234"],
    ws: true,
  })
  .listen(8080);

app.use("/socket/server1", (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:1234",
    pathRewrite: { "^/socket/server1": "/" },
  });
});

app.use("/socket/server1", (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:1235",
    pathRewrite: { "^/socket/server2": "/" },
  });
});

app.use("/backend", (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:9797",
  });
});

app.use("/backend1", (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:9798",
    ws: true,
  });
});

proxy.on("error", (err, req, res) => {
  console.error("Proxy Error:", err);
  res.status(500).send("Proxy Error");
});

// Upgrade WebSocket
server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head, { target: "http://localhost:1235" });
});

const port = 9090;
server.listen(port, () => {
  console.log(`Proxy Server listening on port ${port}`);
});
