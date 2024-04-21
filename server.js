const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Joining a room
  socket.on("joinRoom", (roomId) => {
    roomId = roomId.toString();
    socket.join(roomId);
    console.log(`User joined room: ${roomId} (${typeof roomId})`);
  });

  // Leaving a room
  socket.on("leaveRoom", (roomId) => {
    roomId = roomId.toString();
    socket.leave(roomId);
    console.log(`User left room: ${roomId} (${typeof roomId})`);
  });

  socket.on("message", (roomId) => {
    roomId = roomId.toString();
    io.to(roomId).emit("message", roomId);
    console.log(`Message sent to room ${roomId} (${typeof roomId})`);
  });

  /*
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("message", msg);
  });
*/
  socket.on("disconnect", (reason) => {
    console.log("user disconnected", reason);
  });
});
