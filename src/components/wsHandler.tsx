"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

const handleUserUpdate = () => {
  if (!socket) return;
  console.log("User updated");
};

const handleRoomUpdate = () => {
  if (!socket) return;
  console.log("Room updated");
};

const WSHandler = () => {
  useEffect(() => {
    socket.on("userUpdate", handleUserUpdate);
    socket.on("roomUpdate", handleRoomUpdate);

    // Clean up socket listeners when component unmounts
    return () => {
      socket.off("userUpdate", handleUserUpdate);
      socket.off("roomUpdate", handleRoomUpdate);
    };
  }, [socket]);

  return null;
};

export { WSHandler };
