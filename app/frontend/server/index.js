import express from "express";
import next from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const API_URL = process.env.API_URL || "http://localhost:8000";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    "/api/v1",
    createProxyMiddleware({
      target: API_URL,
      pathRewrite: {
        "^/api/v1": "",
      },
      changeOrigin: true,
    })
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
