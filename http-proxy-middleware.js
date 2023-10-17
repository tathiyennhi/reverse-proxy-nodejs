const express = require("express");
const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Tạo middleware proxy cho /socket/server1
app.use(
  "/socket/server1",
  createProxyMiddleware({
    target: "http://localhost:1234",
    changeOrigin: true,
    ws: true,
    logLevel: "debug", // Thêm cấu hình để log debug
  })
);

// Tạo middleware proxy cho /socket/server2
app.use(
  "/socket/server2",
  createProxyMiddleware({
    target: "http://localhost:1235",
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
  })
);

// Tạo middleware proxy cho các đường dẫn khác
app.use(
  createProxyMiddleware({
    target: "http://localhost:9797",
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
  })
);

const proxyServer = http.createServer(app);

proxyServer.listen(9009, () => {
  console.log(`Proxy Server listening on port 9009`);
});
