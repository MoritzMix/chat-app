const { Server } = require("socket.io");

//ToDo env variable
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

console.log("Websocket server started on port 3001");

io.on("connection", (socket) => {
  // Joining a room
  socket.on("joinRoom", (roomId) => {
    if (roomId === null || roomId === undefined) return;
    roomId = roomId.toString();
    socket.join(roomId);
    console.log(`User joined room: ${roomId} (${typeof roomId})`);
  });

  // Leaving a room
  socket.on("leaveRoom", (roomId) => {
    if (roomId === null || roomId === undefined) return;
    roomId = roomId.toString();
    socket.leave(roomId);
    console.log(`User left room: ${roomId} (${typeof roomId})`);
  });

  // Sending a message to a room
  socket.on("message", (roomId) => {
    if (roomId === null || roomId === undefined) return;
    roomId = roomId.toString();
    io.to(roomId).emit("message", roomId);
    console.log(`Message sent to room ${roomId} (${typeof roomId})`);
  });

  // Sending a message to all users
  socket.on("userUpdate", (msg) => {
    console.log("userUpdate: " + msg);
    io.emit("userUpdate", msg);
  });

  // Sending a message to all users
  socket.on("roomUpdate", (msg) => {
    console.log("roomUpdate: " + msg);
    io.emit("roomUpdate", msg);
  });

  socket.on("disconnect", (reason) => {
    console.log("user disconnected", reason);
  });
});
