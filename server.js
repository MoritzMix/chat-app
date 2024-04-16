const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require("http");
const socketIO = require("socket.io");

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIO(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message1", (data) => {
      console.log("Recieved from API ::", data);
      io.emit("message2", data);
    });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected", reason);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = 3000; //process.env.PORT || 3001;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
