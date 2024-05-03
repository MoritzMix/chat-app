import io from "socket.io-client";

// Create and configure the socket instance

const socket = io(process.env.SOCKET_URL || "http://localhost:3001"); // Adjust URL as needed

export default socket;
