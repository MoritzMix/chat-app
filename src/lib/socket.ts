import io from "socket.io-client";

// Create and configure the socket instance
const socket = io("http://localhost:3001"); // Adjust URL as needed

export default socket;
